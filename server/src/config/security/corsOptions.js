import allowedOrigins from "./allowedOrigins.js";

//used for security as to not allow people who are not coming from the allowedOrigins to make request to our server
const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
    credentials: true,
    enablePreflight: true
}

export default corsOptions