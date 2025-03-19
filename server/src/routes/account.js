import express from "express"
const router = express.Router();
import cors from "cors";
import corsOptionDelegate from "../config/security/corsOptions.js";

import { manageAccount } from "../controllers/accountController.js";

router.get("/", manageAccount);
router.post("/", manageAccount);

router.options("/", cors(corsOptionDelegate), (req, res) => {
  res.sendStatus(200);
})


export default router;