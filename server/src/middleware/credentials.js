import allowedOrigins from '../config/security/allowedOrigins.js';

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  
  // Check if the origin matches allowedOrigins (supports both strings and regex)
  const isAllowedOrigin = allowedOrigins.some(o => 
    typeof o === "string" ? o === origin : o.test(origin)
  );

  if (isAllowedOrigin) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  }

  // Handle preflight requests properly
  if (req.method === "OPTIONS" && isAllowedOrigin) {
    return res.sendStatus(200);
  }

  next();
};

export default credentials;
