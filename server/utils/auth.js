const jwt = require('jsonwebtoken');

const generateAuthToken = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

module.exports = {
  generateAuthToken,
};
