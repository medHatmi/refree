const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const { createError } = require("../utils/error.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.register = async (req, res, next) => {
  // console.log(req.body)
  const { email } = req.body;
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        const user = {
          fullName: req.body.fullName,
          email: req.body.email,
          password: hash,
          // isAdmin: req.body.isAdmin,
        };

        // console.log(user);
        User.create(user)
          .then((result) => {
            res.status(201).json({
              result: result,
              message: "User created successfully",
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: error.message,
            });
          });
      });
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = await jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN_SECRET
    );

    // console.log(token);
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .status(200)
      .json({ details: { ...otherDetails }, token });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    return res
      .clearCookie("access_token")
      .json({ message: "Déconnectez-vous avec succès" });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { user_id, oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid old password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
