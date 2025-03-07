import express from "express"
const router = express.Router();

import { manageAccount } from "../controllers/accountController.js";

router.get("/", manageAccount);


export default router;