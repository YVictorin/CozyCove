import express from "express"
const router = express.Router();

import handleAdmin from "../controllers/adminController.js";
import { getAllUsers } from "../controllers/adminController.js"

router.get("/", getAllUsers);
router.post("/", handleAdmin);


export default router;