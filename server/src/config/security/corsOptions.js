import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Incoming request from:", origin); // Debugging

    ///handles all vercel subdomains with regex
    if (!origin || allowedOrigins.some(o => typeof o === "string" ? o === origin : o.test(origin))) {
      callback(null, { origin: true, credentials: true }); // Allow request
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
