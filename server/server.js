import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import allowedOrigins from "./src/config/security/allowedOrigins.js";

import homeRouter from "./src/routes/home.js";
import loginRoute from "./src/routes/login.js";
import logoutRouter from "./src/routes/logout.js";
import registerRoute from "./src/routes/register.js";
import refreshTokenRouter from "./src/routes/refreshToken.js";
import accountRoute from "./src/routes/account.js";

import dotenv from "dotenv";
dotenv.config();

// Import the database initialization (db.js) to set up the SQLite database.
import './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Custom CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  }
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Debug route to verify CORS configuration
app.get('/api/cors-test', (req, res) => {
  res.json({
    message: 'CORS is configured correctly!',
    origin: req.headers.origin,
    allowedOrigins: allowedOrigins
  });
});

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// Public routes
app.use('/api/home', homeRouter);
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);
app.use('/api/refreshToken', refreshTokenRouter);

// Protected routes (if needed, enable JWT verification)
// app.use(verifyJWT);
app.use('/api/logout', logoutRouter);
app.use('/api/account', accountRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;