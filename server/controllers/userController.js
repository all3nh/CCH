const db = require('../db');

// GET user by username
const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await db.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getUserByUsername,
};
