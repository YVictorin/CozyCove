import express from "express";
const router = express.Router();

import { loginUser } from "../controllers/loginController.js";

router.post("/", loginUser);
router.options("/", (req, res)=>{
    res.status(205).send("AYYYO")
    const origin = req.headers.origin;
    res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
}
)

export default router;
