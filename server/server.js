import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import corsOptions from "./src/config/corsOptions.js";
import credentials from "./src/middleware/credentials.js";

import verifyJWT from "./src/middleware/verifyJWT.js";
import refreshTokenRouter from "./src/routes/refreshToken.js";

import homeRouter from "./src/routes/home.js";
import loginRoute from "./src/routes/login.js";
import logoutRouter from "./src/routes/logout.js";
import registerRoute from "./src/routes/register.js";
import accountRoute from "./src/routes/account.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

//handles checking of options before CORS and makes sure there in the client's fetch credentials: true is required
app.use(credentials);

// CORS would throw an error without the line above
app.use(cors(corsOptions)); 

//middleware for cookies
app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// Public routes (no auth required)
app.use('/api/home', homeRouter);
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);
app.use('/api/refreshToken', refreshTokenRouter);  // Token refresh must be public

// Protected routes below (will require JWT)
// app.use(verifyJWT); 

app.use('/api/logout', logoutRouter);
app.use('/api/account', accountRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app;