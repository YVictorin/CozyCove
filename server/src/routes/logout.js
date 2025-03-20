// logout.js
import express from 'express';
import { handleLogout } from '../controllers/logoutController.js';

const router = express.Router();

// Use POST for logout (no authentication required)
router.post('/', handleLogout);

export default router;
