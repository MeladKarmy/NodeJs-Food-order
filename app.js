const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const globalErrorHandler = require("./Controllers/middelwareError");
const ErrorHandling = require("./Utils/errorHandling");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const Pizza = require("./Routes/pizza");
const Category = require("./Routes/category");
const Massage = require("./Routes/massage");
const Users = require("./Routes/users");
const Orders = require("./Routes/order");
const Auth = require("./Routes/Auth");

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    key: "user",
    name: "jwt",
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.BD_URI,
      autoRemove: "interval",
      autoRemoveInterval: 10, // In minutes. Default
      ttl: 1 * 60 * 60, // = 1 hour.
    }),
    cookie: {
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "POST,GET,PUT,DELETE",
  })
);
app.use("/api/v1/auth", Auth);
app.use("/api/v1/pizza", Pizza);
app.use("/api/v1/category", Category);
app.use("/api/v1/massage", Massage);
app.use("/api/v1/order", Orders);
app.use("/api/v1/users", Users);

app.all("*", (req, res, next) => {
  const err = new ErrorHandling(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});
// Error Middleware
// app.use((error, request, response, next) => {
//   response.status(500).json({ message: error + "" });
// });

app.use(globalErrorHandler);

module.exports = app;
