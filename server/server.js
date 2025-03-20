import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
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

// CORS Configuration - IMPORTANT: Don't use multiple cors() middleware calls
const corsOptions = {
  origin: function(origin, callback) {
    // For development, allow localhost and Vercel domains
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://cozy-cove-git-yvpages-austins-projects-977ccb2e.vercel.app",
    ];
    
    // Also allow Vercel domains dynamically
    const vercelPattern = /\.vercel\.app$/;
    
    // During development/debugging, log origins
    console.log("Request origin:", origin);
    
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) {
      callback(null, true);
      return;
    }
    
    // Check if the origin is allowed
    if (
      allowedOrigins.includes(origin) || 
      vercelPattern.test(origin)
    ) {
      // Return the specific origin that was sent (don't use *)
      callback(null, origin);
    } else {
      console.log("Blocked origin:", origin);
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Apply CORS middleware - only once!
app.use(cors(corsOptions));

// Handle OPTIONS preflight requests explicitly - this helps some browsers
app.options('*', cors(corsOptions));

// Debug middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} from origin: ${req.headers.origin || 'unknown'}`);
  next();
});

// Middleware for cookies
app.use(cookieParser());

// Body parsers
app.use(express.json());
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