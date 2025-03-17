import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import corsOptions from "./src/config/security/allowedOrigins.js";
import credentials from "./src/middleware/credentials.js";
import verifyJWT from "./src/middleware/verifyJWT.js";
import refreshTokenRouter from "./src/routes/refreshToken.js";
import validateRequest from "./src/middleware/validateRequest.js";
import { loginSchema, registerSchema } from "./src/schemas/authSchemas.js";

import homeRouter from "./src/routes/home.js";
import loginRoute from "./src/routes/login.js";
import logoutRouter from "./src/routes/logout.js";
import registerRoute from "./src/routes/register.js";
import accountRoute from "./src/routes/account.js";
import dotenv from "dotenv";
dotenv.config();

// Import the database initialization (db.js) to set up the SQLite database.
import './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(credentials);       // Handle CORS preflight requests - this middleware must run before cors()
app.use(cors(corsOptions)); 

//middleware for cookies
app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// Public routes below (no auth required)
app.use('/api/home', homeRouter);

//Routes needing Joi validation
// app.use('/api/login', validateRequest(loginSchema), loginRoute);
// app.use('/api/register', validateRequest(registerSchema), registerRoute);

app.use('/api/login',  loginRoute);
app.use('/api/register', registerRoute);

// Token refresh must be public
app.use('/api/refreshToken', refreshTokenRouter);  

// Protected routes below (will require JWT)
// app.use(verifyJWT); 

app.use('/api/logout', logoutRouter);
app.use('/api/account', accountRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
