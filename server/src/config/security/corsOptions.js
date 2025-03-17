import allowedOrigins from "./allowedOrigins.js";

//used for security as to not allow people who are not coming from the allowedOrigins to make request to our server
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions;