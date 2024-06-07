const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/tokenGenerator");

async function registerUser(req, res) {
  const { name, email, password } = req.body;
  if (name || email || password) {
    return res.status(400).json({ Error: "Enter details in all field" });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ Error: "User already exist in system" });
    }

    const user = await User.create({ name, email, password });
    // const token = generateToken(user._id);
    // res.cookie("token", token, { httpOnly: true });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: "Server error" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  if (email || password) {
    return res.status(400).json({ Error: "Please provide email and password" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ Error: "Invaild Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, { httpOnly: true });

    res.json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { loginUser, registerUser };
