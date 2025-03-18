import allowedOrigins from "./security/allowedOrigins.js";

// Used for security to allow requests only from approved origins.
const corsOptions = {
    origin: (origin, callback) => {
      console.log("Incoming request from origin:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  };  

export default corsOptions;
