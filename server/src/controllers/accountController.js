import pool from '../../db.js';

export const manageAccount = async (req, res, next) => {
  try {
    console.log("Request body:", req.body); // Debug log
    console.log("JWT user info:", req.user); // Debug log if set by verifyJWT
    
    // Get email from request body or from JWT token
    const userEmail = req.body?.email || req.user?.email;
    
    if (!userEmail) {
      console.log("No email provided in request");
      return res.status(400).json({ message: 'Email is required' });
    }

    console.log("Fetching user with email:", userEmail);
    
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [userEmail]);

    if (rows.length === 0) {
      console.log("No user found with email:", userEmail);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("User found:", rows[0].id);
    
    // Don't return password or sensitive fields
    res.json({
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      created_at: rows[0].created_at
    });
  } catch (error) {
    console.error("Account controller error:", error);
    next(error);
  }
};
