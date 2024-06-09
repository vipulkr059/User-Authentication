const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authorization(req, res, next) {
  let token;
  if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findOne(decoded.firstName).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
}

module.exports = { authorization };
