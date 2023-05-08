const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  login,
};
