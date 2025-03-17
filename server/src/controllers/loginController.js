import db from "../../db.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check for required fields
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Query the SQLite database for the user by email
  const sql = "SELECT * FROM users WHERE email = ?";
  db.get(sql, [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    try {
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Successful login
      // Here, you might want to generate a JWT token to send back to the client.
      res.json({
        message: "Logged in successfully",
        user: { id: user.id, name: user.name, email: user.email }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
