import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyJWT = (req, res, next) => {
    console.log("Request Headers:", req.headers); // Debug log to inspect all headers

    const authHeader = req.headers['authorization'] || req.cookies?.token;
    console.log("Extracted Authorization Header:", authHeader); // Debug log

    if (!authHeader) {
        console.log("No Auth Header FOUND");
        return res.status(401).json({ message: "Auth header not found." });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    console.log("Extracted Token:", token); // Debug log

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) {
                console.log("JWT verification failed:", err.message);
                return res.sendStatus(403); // Invalid token
            }
            req.email = decoded.email;
            next();
        }
    );
};

export default verifyJWT;