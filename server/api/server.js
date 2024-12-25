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
const { Configuration, OpenAIApi } = require('openai');
const multer = require('multer');
require("dotenv").config();

const { callOpenAI, callGemini } = require("./apiUtils");
const { validateInput } = require("./validationUtils");


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

// Declare variables outside the conditional block
let privatekey;
let certi;
let dbConfig;

const ENV = 'production'; // production environment and development environment
if (ENV === 'development') {
// development environment variables
  dbConfig = config.development;
  privatekey = dbConfig.privatekey;
  certi = dbConfig.certificate;
} else if (ENV === 'production') {
// Production  environments
  dbConfig = config.production;
  privatekey = "/etc/letsencrypt/live/lakefrontai.com/privkey.pem";
  certi = "/etc/letsencrypt/live/lakefrontai.com/fullchain.pem";
}


// SSL Certificates
const privateKey = fs.readFileSync(privatekey,"utf8");
const certificate = fs.readFileSync(certi,"utf8");
const credentials = { key: privateKey, cert: certificate };


// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Temporary storage for document contexts
let documentContexts = [];


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
  console.log("verifyJWT");
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
app.get("/:username/dashboard", verifyJWT, (req, res) => {
  console.log("inside dashboard");
  res.status(200).send(`welcome to the dashboard ${req.params.username}`);
});

app.get("/datacatalog", verifyJWT, (req, res) => {
  console.log("inside datacatalog page");
  res.status(200).send(`datacatalog`);
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

      const refreshToken = jwt.sign({ id: user.id, email: user.email }, JWT_REFRESH_SECRET, {
        expiresIn: "1d",
      });

      return sendResponse(res, 200, "success", "Login successful", { token, refreshToken });
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

// OpenAI Integration: Prompt Endpoint
app.post("/processChat", async (req, res) => {
  const { prompt, selectedModels } = req.body;

  // Load API keys
  const apiKeys = {
    OpenAI:  dbConfig.OPENAI_API_KEY,
    Gemini:  dbConfig.GEMINI_API_KEY,
  };

  try {
    // Validate input
    validateInput(prompt, selectedModels, apiKeys);

    // Prepare API calls dynamically
    const apiCalls = [];
    if (selectedModels.includes("OpenAI")) {
      apiCalls.push(callOpenAI(prompt, apiKeys.OpenAI));
    }
    if (selectedModels.includes("Gemini")) {
      apiCalls.push(callGemini(prompt, apiKeys.Gemini));
    }

    // Execute API calls in parallel
    const results = await Promise.allSettled(apiCalls);

    // Aggregate responses
    const responses = {};
    let index = 0;
    if (selectedModels.includes("OpenAI")) {
      responses["OpenAI"] =
        results[index]?.status === "fulfilled"
          ? results[index]?.value
          : "Error fetching OpenAI response";
      index++;
    }
    if (selectedModels.includes("Gemini")) {
      responses["Gemini"] =
        results[index]?.status === "fulfilled"
          ? results[index]?.value
          : "Error fetching Gemini response";
      index++;
    }

    console.log("🔹 Aggregated Responses:", responses);

    // Send aggregated responses to the client
    return res.status(200).json({
      status: "success",
      message: "Responses retrieved successfully",
      data: responses,
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    return res.status(500).json({
      status: "error",
      message: error.message || "Error processing requests",
    });
  }
});

// recent activities 

// Endpoint to fetch user-specific activities dynamically
app.get("/:username/recent-activity", verifyJWT, (req, res) => {
  const { username } = req.params;

  const query = "SELECT * FROM recent_activity WHERE username = ?     ORDER BY id DESC LIMIT 3";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error fetching user activity:", err);
      return res.status(500).json({ error: "Failed to retrieve user activity" });
    }
    if (results.length === 0) {
      return res.status(200).json({ message: "No activity found for this user" });
    }
    res.status(200).json(results);
  });
});

// Endpoint to add an activity for a specific user
app.post("/recent-activity", verifyJWT, (req, res) => {
  const { username, name, href, initial, current } = req.body;

  if (!username || !name || !href || !initial) {
    return res.status(400).json({ error: "username, name, href, and initial are required fields." });
  }

  const query =
    "INSERT INTO recent_activity (username, name, href, initial, current) VALUES (?, ?, ?, ?, ?)";
  const values = [username, name, href, initial, current || false];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Failed to add recent activity" });
    }
    res.status(201).json({ message: "Activity added successfully", id: result.insertId });
  });
});

// Endpoint to Upload and parse multiple documents
app.post('/:username/upload-documents', verifyJWT, upload.array('files'), async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded.' });
    }

    // Parse and store the content of each file
    documentContexts = files.map((file) => file.buffer.toString('utf-8'));
    console.log(documentContexts);
    res.status(200).json({ message: 'Documents uploaded and parsed successfully.' });
  } catch (error) {
    console.error('Error uploading documents:', error);
    res.status(500).json({ error: 'Failed to upload documents.' });
  }
});

// Endpoint to Ask questions based on the documents
app.post('/:username/ask-question', verifyJWT, async (req, res) => {
  // Load API keys
  const openai = new OpenAI({ apiKey: dbConfig.OPENAI_API_KEY });

  try {
    const { question } = req.body;

    if (documentContexts.length === 0) {
      return res.status(400).json({ error: 'No document contexts available. Upload documents first.' });
    }

    // Concatenate all document contexts to form the context
    const combinedContext = documentContexts.join('\n\n');

    const prompt = `
      Documents Content:
      ${combinedContext}

      Question: ${question}
      Answer:
    `;

    // OpenAI API call using GPT-4
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });
    console.log(response);
    const answer = response.choices[0].message['content'];
    res.status(200).json({ answer: answer || 'No answer available.' });
  } catch (error) {
    console.error('Error processing question:', error);
    res.status(500).json({ error: 'Failed to process question.' });
  }
});

// Start HTTPS Server
https.createServer(credentials, app).listen(PORT, () => {
  console.log(`HTTPS Server running on https://lakefrontai.com:${PORT}`);
});