const express = require("express");
const router = express.Router();
const users = require("../Controllers/Auth");

router.route("/login").post(users.login);
router.route("/register").post(users.signUp);

module.exports = router;
