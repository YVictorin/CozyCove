// used to handle JWT refresh tokens
import express from "express"
const router = express.Router();

import { handleRefreshToken } from "../controllers/refreshTokenController.js";

router.get("/", handleRefreshToken);


export default router;