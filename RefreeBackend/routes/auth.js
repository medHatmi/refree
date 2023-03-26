const express = require("express");
const {
  login,
  register,
  logout,
  resetPassword
} = require("../controllers/auth.js");

const {
  verifyToken
} = require("../utils/verifyToken.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/resetPassword",verifyToken, resetPassword);

module.exports = router;
