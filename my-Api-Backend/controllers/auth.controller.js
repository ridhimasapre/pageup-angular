const jwt = require("jsonwebtoken");
const User = require("../models/login");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      employee: {
        id: user._id,
        name: user.username,
        role: user.role,
        isAdmin: user.role !== "Employee",
      },
      token,
      role: user.role,
    },
  });
};
