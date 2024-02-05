const users = require("../Models/users");
const ErrorHandling = require("../Utils/errorHandling");
const asyncHandaler = require("../Utils/handelasync");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.login = asyncHandaler(async (req, res, next) => {
  let user = await users.findOne({ email: req.body.email });
  if (!user) {
    const err = new ErrorHandling("Email Not Exaits !.. Please sign up..", 404);
    return next(err);
  }
  let isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    const err = new ErrorHandling("password or Email Invalid", 404);
    return next(err);
  }
  let token = jwt.sign(
    {
      nameEn: user.nameEn,
      nameAr: user.nameAr,
      role: user.Role,
      userId: user._id,
    },
    process.env.SECRET_KEY_JWT,
    { expiresIn: "1h" }
  );
  res
    .status(200)
    .json({ status: "success", data: { message: "Login Success", token } });
});

exports.signUp = asyncHandaler(async (req, res, next) => {
  let user = await users.findOne({ email: req.body.email });
  if (user) {
    const err = new ErrorHandling("Email Already Exists", 404);
    return next(err);
  }
  let newUser = await users.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      message: "Sign up Success",
    },
  });
});
exports.checkAuthAdmin = asyncHandaler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    const err = new ErrorHandling("You are not Authorization", 404);
    return next(err);
  }

  let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);

  let user = await users.findById(decoded.userId);
  if (decoded.userId !== user._id) {
    const err = new ErrorHandling("you are not Authorization", 404);
    return next(err);
  }
  if (user.Role == "user") {
    const err = new ErrorHandling("you are not Authorization", 404);
    return next(err);
  }
  if (user.Role == "admin") next();
});

exports.checkAuthUser = asyncHandaler(async (req, res, next) => {
  let token;
  console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    const err = new ErrorHandling("you are not Authorization", 404);
    return next(err);
  }
  let decoded = await jwt.verify(token, process.env.SECRET_KEY_JWT);

  let user = await users.findById(decoded.userId);
  if (decoded.userId !== user.id) {
    const err = new ErrorHandling("User not found", 404);
  }
  next();
});
