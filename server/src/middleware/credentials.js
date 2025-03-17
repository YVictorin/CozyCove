import allowedOrigins from "../config/security/allowedOrigins.js";

const credentials = (req, res, next) => {
    const origin = req.headers.origin;

    if(allowedOrigins.includes(origin)) {
        //CORS looks for this, adds another level of security
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
    }
    next();
}

export default credentials;