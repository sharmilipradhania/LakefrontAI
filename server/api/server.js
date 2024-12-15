const jwt = require('jsonwebtoken');
const https = require("https");
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


// Load environment variables
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Token Authentication
const JWT_SECRET = 'secret';
const JWT_REFRESH_SECRET = 'refresh secret';

// MySQL Connection
const configPath = path.resolve(__dirname, "config.ini");
if (!fs.existsSync(configPath)) {
  console.error(chalk.red(`❌ Configuration file not found at: ${configPath}`));
  process.exit(1);
}
const config = ini.parse(fs.readFileSync(configPath, "utf-8"));

// Production  environments

const dbConfig = config.database;
const privatekey = dbConfig.privatekey;
const certi = dbConfig.certificate;
// deveopment environment variables
//const dbConfig = config.development;
//const privatekey = dbConfig.privatekey;
//const certi = dbConfig.certificate;


// SSL Certificates
const privateKey = fs.readFileSync(privatekey,"utf8");
const certificate = fs.readFileSync(certi,"utf8");
const credentials = { key: privateKey, cert: certificate };





const db = mysql.createConnection({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

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

// JWT Middleware for Protected Routes

const extractToken = (req) => {
  // Get the authorization header safely
  const authHeader = req.headers?.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Safely split and extract the token
    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);
    return token;
  } else {
    console.error("Authorization header missing or invalid.");
    return null; // Return null if token is not available
  }
};

const verifyJWT = (req, res, next) => {
  const token = extractToken(req);
  console.log(req);
  console.log(token);
  if (!token) {
    return sendResponse(res, 401, "error", "Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return sendResponse(res, 403, "error", "Invalid or expired token.");
  }
};

// Routes
app.get("/", (req, res) => {
  res.send(`Hello World! Welcome, Guest`);
});

// verify token 
app.get("/dashboard", verifyJWT, (req, res) => {
  console.log("inside dashboard");
  res.status(200).send(`welcome to the dashboard`);
});

app.post("/refresh", (req, res) => {
  const { refreshToken} = req.body;

  if (!refreshToken) { 
    res.status(401).send("Refresh token is required");
  }
  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) { 
        res.status(403).send("invalid refresh token");
    }
    // Extract user data from the decoded refresh token
    console.log(decoded);
    const { email } = decoded;
    console.log( email);
    if ( !email) {
      return res.status(403).send("Invalid refresh token payload");
    }
    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json( { token});
  });

});

// User Login Route - Generate JWT Token
app.post("/auth", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return sendResponse(res, 400, "error", "Please provide email and password");
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      return sendResponse(res, 500, "error", "Database error");
    }
    console.log(results);
    if (results.length === 0) {
      return sendResponse(res, 401, "error", "Invalid credentials");
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user);
    if (isMatch) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      const refresh_token = jwt.sign({ id: user.id, email: user.email }, JWT_REFRESH_SECRET, {
        expiresIn: "1d",
      });

      return sendResponse(res, 200, "success", "Login successful", { token, refresh_token });
    } else {
      return sendResponse(res, 401, "error", "Invalid credentials");
    }
  });
});

// Protected Route Example
app.get("/api/protected", verifyJWT, (req, res) => {
  return sendResponse(res, 200, "success", "You accessed a protected route!", {
    user: req.user,
  });
});

// Logout Route - Clear Cookie
app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  return sendResponse(res, 200, "success", "Logged out successfully");
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
        return sendResponse(res, 500, "error", "Error while registering user");
      }
      return sendResponse(res, 201, "success", "Registered successfully");
    });
  } catch (err) {
    return sendResponse(res, 500, "error", "Internal server error");
  }
});

// Start HTTPS Server
https.createServer(credentials, app).listen(PORT, () => {
  console.log(`HTTPS Server running on https://lakefrontai.com:${PORT}`);
});