// logoutController.js
export const handleLogout = async (req, res, next) => {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  };
  