import allowedOrigins from "../config/security/allowedOrigins.js";

const credentials = (req, res, next) => {
    const origin = req.headers.origin;

    // Always set CORS headers, but only allow specific origins
    if (allowedOrigins.includes(origin)) {
        // Set the Access-Control-Allow-Origin header to the requesting origin
        res.header('Access-Control-Allow-Origin', origin);

        // Other CORS headers
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    } else {
        // For origins not in the allowed list, set Access-Control-Allow-Origin to a specific origin
        // NOT to '*', which is incompatible with credentials
        res.header('Access-Control-Allow-Origin', 'https://cozycove.vercel.app/'); // Or your primary frontend origin
    }
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
}

export default credentials;