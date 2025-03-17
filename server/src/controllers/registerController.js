import db from "../../db.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { needType, name, email, password, agreeTerms } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    const sql = `
      INSERT INTO users (needType, name, email, password, agreeTerms)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(
      sql,
      [needType, name, email, hashedPassword, agreeTerms ? 1 : 0],
      function (err) {
        if (err) {
          // Handle duplicate email error
          if (err.message.includes("UNIQUE constraint failed: users.email")) {
            return res.status(400).json({ error: "Email already exists." });
          }
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "User registered successfully!", userId: this.lastID });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
