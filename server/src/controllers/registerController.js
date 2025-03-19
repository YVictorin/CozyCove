import pool from '../../db.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  try {
    const { needType, name, email, password, agreeTerms } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await pool.query(
      `INSERT INTO users (needType, name, email, password, agreeTerms)
       VALUES (?, ?, ?, ?, ?)`,
      [needType, name, email, hashedPassword, agreeTerms ? 1 : 0]
    );
    
    res.status(201).json({ message: "User registered successfully!", userId: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "Email already exists." });
    }
    res.status(500).json({ error: err.message });
  }
};
