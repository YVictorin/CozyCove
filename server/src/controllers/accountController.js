import pool from '../../db.js';

export const manageAccount = async (req, res, next) => {
  try {
    // Use the userId from session if available, otherwise default to 1 for testing.
    const userId = req.session?.userId || 1;

    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};
