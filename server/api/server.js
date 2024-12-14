const https = require('https');
const express = require("express");
const mysql = require("mysql2");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");
const cors = require("cors");
const chalk = require("chalk");
const fs = require("fs");
const ini = require("ini");
const { OpenAI } = require("openai");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// Load environment variables

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// SSL Certificates
const privateKey = fs.readFileSync("/etc/letsencrypt/live/lakefrontai.com/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/lakefrontai.com/fullchain.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Load Database Configuration from config.ini
const configPath = path.resolve(__dirname, "config.ini"); // Dynamically resolve the file path
if (!fs.existsSync(configPath)) {
  console.error(chalk.red(`❌ Configuration file not found at: ${configPath}`));
  process.exit(1);
}

const config = ini.parse(fs.readFileSync(configPath, "utf-8"));
const dbConfig = config.database;

// MySQL Connection
const db = mysql.createConnection({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});


// JWT TOKEN 

const JWT_SECRET = dbConfig.JWT_SECRET || "jwt-secret-key";

// jwt middleware configuration for protected routes

const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return sendResponse(res, 401, "error", "Invalid JWT token. Access is denied");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return sendResponse(res,403, "error", "Invalid or expired JWT token. Access is denied");
  }
};

db.connect((err) => {
  if (err) {
    console.error(chalk.red("❌ Database connection failed:"), err.message);
  } else {
    console.log(chalk.green("✅ Connected to MySQL successfully!"));
  }
});




// Unified Response Format
const sendResponse = (res, status, result, msg, data = null) => {
  return res.status(status).json({ result, msg, data });
};


// Routes
app.get("/", (req, res) => {
  const username = req.query.username || "Guest";
  res.send(`Hello World! Welcome, ${username}`);
});

// Example Registration Endpoint
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendResponse(res, 400, "error", "Please provide email and password");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO `users` (`email`, `password`) VALUES (?, ?)";
    db.query(query, [email, hashedPassword], (err) => {
      if (err) {
        console.error(chalk.red("❌ Registration error:"), err.message);
        return sendResponse(res, 500, "error", "Error while registering user");
      }
      console.log(chalk.green("✅ User registered successfully"));
      return sendResponse(res, 201, "success", "Registered successfully");
    });
  } catch (err) {
    console.error(chalk.red("❌ Error:"), err.message);
    return sendResponse(res, 500, "error", "Internal server error");
  }
});

// OpenAI Integration: Prompt Endpoint
app.post("/openai", async (req, res) => {
  const { prompt } = req.body;
  // OpenAI Configuration
  const OPENAI_API_KEY =  dbConfig.OPENAI_API_KEY;

  console.log("OpenAI API Key:", OPENAI_API_KEY);
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY, // Make sure OPENAI_API_KEY exists in .env
  });

  if (!prompt) {
    return sendResponse(res, 400, "error", "Prompt is required");
  }

  try {
    // Send request to OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Specify the model
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const reply = response.choices[0]?.message?.content || "No response";
    console.log(chalk.blue("🔹 OpenAI Response:"), reply);

    return sendResponse(res, 200, "success", "Prompt processed successfully", { reply });
  } catch (error) {
    console.error(chalk.red("❌ OpenAI API Error:"), error.message);
    return sendResponse(res, 500, "error", "Error processing OpenAI prompt");
  }
});

app.post("/auth", (request, response) => {
  const { username, password } = request.body;

  console.log("Username:", username);

  // Ensure the input fields exist and are not empty
  if (!username || !password) {
    return response
      .status(400)
      .json({ result: "error", msg: "Please enter Username and Password!" });
  }

  // Fetch the user from the database
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [username], async (error, results) => {
    if (error) {
      console.error("❌ Database error:", error.message);
      return response
        .status(500)
        .json({ result: "error", msg: "Internal server error" });
    }

    // Check if the user exists
    if (results.length === 0) {
      return response
        .status(401)
        .json({ result: "error", msg: "Incorrect Username and/or Password!" });
    }

    const user = results[0]; // Retrieved user details
    const storedHashedPassword = user.password;

    try {
      // Compare entered password with stored hashed password
      const isMatch = await bcrypt.compare(password, storedHashedPassword);

      if (isMatch) {
        console.log("✅ Authentication successful");
        request.session.loggedin = true;
        request.session.username = username;
        // token signature
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
          expiresIn: "1h",
        });

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });

        return response
          .status(200)
          .json({ result: "success", msg: "Login successfully", token:token });
      } else {
        return response
          .status(401)
          .json({ result: "error", msg: "Incorrect Username and/or Password!" });
      }
    } catch (compareError) {
      console.error("❌ Error during password comparison:", compareError.message);
      return response
        .status(500)
        .json({ result: "error", msg: "Internal server error" });
    }
  });
});

// Protected Route Example
app.get("/protected", verifyJWT, (req, res) => {
  return sendResponse(res, 200, "success", "You accessed a protected route!", {
    user: req.user,
  });
});

// Logout Route - Clear Cookie
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  return sendResponse(res, 200, "success", "Logged out successfully");
});

// Start HTTPS server
https.createServer(credentials, app).listen(PORT, () => {
  console.log(`HTTPS Server running on https://172-31-34-150:${PORT}`);
});