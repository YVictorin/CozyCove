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
    let corsOptions;
    if(allowedOrigins.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true }
    } else {
      corsOptions = { origin: false }
    }

    callback(null, corsOptions)
  }

export default corsOptionDelegate;
