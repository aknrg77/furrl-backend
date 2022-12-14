const shortid = require("shortid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");
const user = require("../models/user");

const createUser = async (req, res) => {
  let user = new User();
  user.uid = shortid.generate();
  user.email = req.body.email;

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    if (req.body.role) {
      user.role = req.body.role;
    }
    await user.save();
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }

  const token = jwt.sign(
    { email: user.email, uid: user.uid },
    process.env.SECRET_KEY
  );
  return res.status(200).json({ token });
};

const loginUser = async (req, res) => {
  let token;
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }

  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      token = jwt.sign(
        { email: user.email, uid: user.uid },
        process.env.SECRET_KEY
      );
    } else {
      return res.status(401).json({ Message: "Unauthorized!!!" });
    }
  } else {
    return res.status(404).json({ Message: "Email not found pls login" });
  }

  return res.status(200).json({ token });
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }
  return res.status(200).json({ Message: "User deleted Successfully"});
};

module.exports = {
  createUser,
  loginUser,
  deleteUser,
};
