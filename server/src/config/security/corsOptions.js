import allowedOrigins from "./allowedOrigins.js";

// Used for security to allow requests only from approved origins.
// const corsOptions = {
//     origin: (origin, callback) => {
//       console.log("Incoming request from origin:", origin);

//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);

//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   };  


const corsOptionDelegate = (req, callback) => {
  const origin = req.header("Origin");
  console.log("Incoming request from origin:", origin); // Debug log

  let corsOptions;
  if (allowedOrigins.includes(origin)) {
    corsOptions = { origin: true, credentials: true }; // Allow requests from allowed origins
  } else {
    corsOptions = { origin: false }; // Block requests from disallowed origins
  }
  callback(null, corsOptions);
};

export default corsOptionDelegate;

