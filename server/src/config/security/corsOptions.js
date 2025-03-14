import allowedOrigins from "./security/allowedOrigins.js";

//used for security as to not allow people who are not coming from the allowedOrigins to make request to our server
const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

export default corsOptions