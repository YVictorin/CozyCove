import pool from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  try {
    // Debug: Log the JWT_SECRET value
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

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
    
    // Generate a JWT token with user info
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    // Debug: Log the generated token
    console.log("Generated token:", token);
    
    // Set the token in an HTTP‑only cookie
    res.cookie('token', token, {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      sameSite: "lax" 
    });
    // res.header('Authorization', `Bearer ${token}`);
    
    res.json({
      message: "Logged in successfully",
      user: { id: user.id, name: user.name, email: user.email },
      accessToken: token, 
      

    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
