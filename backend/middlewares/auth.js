const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authorization = async (req, res, next) => {
  let token;
  if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(401).json({ message: "No authorization token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne(decoded.firstName).select("-password");
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
