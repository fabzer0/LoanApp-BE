const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const modules = require("./modules");
const { appSecret } = require("./config/keys");
require("./utils/passport");
require("./utils");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.disable("x-powered-by");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: appSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3 * 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

modules(app, passport);

/* Catch invalid routers */
app.use("*", (_, res) =>
  res.status(404).json({
    message: "Not Found. Use /api/v1 to access the api"
  })
);

module.exports = app;
