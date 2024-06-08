const jwt = require("jsonwebtoken");

const generateToken = (userInfo) => {
  const payload = { ...userInfo };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};
module.exports = { generateToken };
