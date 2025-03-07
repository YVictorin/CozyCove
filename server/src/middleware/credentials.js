import allowedOrigins from "../config/allowedOrigins.js";

const credentials = (req, res, next) => {
    const origin = req.headers.origin;

    if(allowedOrigins.includes(origin)) {
        //CORS looks for this, adds another level of security
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

export default credentials;