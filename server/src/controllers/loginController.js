// src/controllers/loginController.js
import pool from '../../db.js';
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
        
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }
    
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    
    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    
    // Optionally generate a JWT token here
    res.json({
      message: "Logged in successfully",
      user: { id: user.id, name: user.name, email: user.email },
      accessToken: "your_jwt_token_here"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
