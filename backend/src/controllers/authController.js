const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// Handle login or register on POST.
exports.post_login_register = async (req, res) => {
  const { email, password } = req.body;

  if (email == null || password == null) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  let user = await User.findOne({ email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      email,
      password: hashedPassword,
    });

    try {
      await user.save();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  res.json({ token });
};
