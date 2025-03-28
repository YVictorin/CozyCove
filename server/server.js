import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import corsOptionDelegate from "./src/config/security/corsOptions.js";
import corsOptions from "./src/config/security/allowedOrigins.js";
import credentials from "./src/middleware/credentials.js";
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

// Enable the credentials middleware for proper CORS handling
app.use(credentials);

// CORS middleware with proper configuration
app.use(cors(corsOptionDelegate));

// Debug middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} from origin: ${req.headers.origin || 'unknown'}`);
  console.log("Request headers:", req.headers);
  next();
});

// Middleware for cookies
app.use(cookieParser());

// Parse JSON bodies - MAKE SURE THIS IS BEFORE THE ROUTES
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

// Special route for account
// Note: Make this route handle both auth and non-auth scenarios
// app.use('/api/account', accountRoute);

// Protected routes (require JWT verification)
app.use('/api/account', verifyJWT, accountRoute);
app.use('/api/users', adminRouter);
app.use('/api/admin', adminRouter);
app.use('/api/logout', logoutRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;