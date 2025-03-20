import allowedOrigins from '../config/security/allowedOrigins.js';

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  
  // For debugging
  console.log(`Processing request from origin: ${origin}`);
  
  // Check if the origin matches allowedOrigins (supports both strings and regex)
  const isAllowedOrigin = !origin || allowedOrigins.some(o => {
    const matches = typeof o === "string" ? o === origin : o instanceof RegExp && o.test(origin);
    if (matches) console.log(`Origin ${origin} matched pattern: ${o.toString()}`);
    return matches;
  });

  // Always set these headers for Vercel
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
    // Essential CORS headers for preflight
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    return res.status(200).end();
  }

  if (isAllowedOrigin) {
    // Set credentials to true to allow cookies and auth headers
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', origin); 
  } else {
    console.log(`Origin ${origin} is not allowed by CORS`);
  }

  next();
};

export default credentials;