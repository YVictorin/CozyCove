import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import corsOptionDelegate from "./src/config/security/corsOptions.js";

import corsOptions from "./src/config/security/allowedOrigins.js";
import credentials from "./src/middleware/credentials.js";

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

// Handles checking of options before CORS and ensures the client's fetch credentials: true is required
app.use(credentials)
// app.use(cors(corsOptions))

// Handle OPTIONS requests explicitly
// app.options('*', (req, res) => {
//   // The credentials middleware already set the headers
//   res.status(200).end();
// });

// Add debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} from origin: ${req.headers.origin}`);
  next();
});

// CORS middleware (keep this commented out since we're using credentials middleware)
// app.use(cors(corsOptions));

// Middleware for cookies
app.use(cookieParser());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// Public routes (no auth required)
app.use('/api/home', homeRouter);

// app.options('/api/login', cors());
app.use('/api/login', cors(corsOptionDelegate), loginRoute);

// app.options('/api/register', cors());
app.use('/api/register', cors(corsOptionDelegate), registerRoute);

// Token refresh (public route)
app.use('/api/refreshToken', refreshTokenRouter);

// Protected routes (will require JWT verification)
// app.use(verifyJWT);

app.use('/api/logout', logoutRouter);
app.use('/api/account', accountRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;