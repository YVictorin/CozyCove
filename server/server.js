import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import allowedOrigins from "./src/config/security/allowedOrigins.js";

import adminRouter from "./src/routes/admin.js"
import homeRouter from "./src/routes/home.js";
import loginRoute from "./src/routes/login.js";
import logoutRouter from "./src/routes/logout.js";
import registerRoute from "./src/routes/register.js";
import refreshTokenRouter from "./src/routes/refreshToken.js";
import accountRoute from "./src/routes/account.js";

import verifyJWT from "./src/middleware/verifyJWT.js";
import dotenv from "dotenv";
dotenv.config();

// Import the database initialization (db.js) to set up the SQLite database.
import './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration specifically for Vercel
const corsOptionsDelegate = (req, callback) => {
  const origin = req.header('Origin');
  const isAllowedOrigin = !origin || allowedOrigins.some(allowedOrigin => {
    return typeof allowedOrigin === 'string' 
      ? allowedOrigin === origin 
      : allowedOrigin instanceof RegExp && allowedOrigin.test(origin);
  });

  callback(null, {
    origin: isAllowedOrigin ? origin : false,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
  });
};

// Handle OPTIONS requests explicitly - CRITICAL FOR VERCEL
app.options('*', cors(corsOptionsDelegate));

// Apply CORS to all routes
app.use(cors(corsOptionsDelegate));

// Debug middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} from origin: ${req.headers.origin || 'unknown'}`);
  
  // Check if origin is allowed (for debugging)
  if (req.headers.origin) {
    const origin = req.headers.origin;
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      return typeof allowedOrigin === 'string' 
        ? allowedOrigin === origin 
        : allowedOrigin instanceof RegExp && allowedOrigin.test(origin);
    });
    console.log(`Origin ${origin} is ${isAllowed ? 'allowed' : 'NOT allowed'}`);
  }
  
  next();
});

// Middleware for cookies
app.use(cookieParser());

app.use(express.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Express error:", err.stack);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

// Public routes (no auth required)
app.use('/api/home', homeRouter);
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);
app.use('/api/refreshToken', refreshTokenRouter);

// Protected routes (require JWT verification)
app.use('/api/account', verifyJWT, accountRoute);
app.use('/api/users', adminRouter);
app.use('/api/admin', adminRouter);
app.use('/api/logout', verifyJWT, logoutRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;