const UserServices = require("../services/users");
const models = require("../database/models");
const quickBooksRouter = require("./clients/quickbooks");
const userRouter = require("./clients/auth");
const questionnaireRouter = require("./clients/clientDetails");
const adminRouter = require("./admin");
const bankRouter = require("./admin/banks");
const apiPrefix = "/api/v1";

const { Client, AuthClient } = models;

const routes = (app, passport) => {
  app.use(apiPrefix, quickBooksRouter);
  app.use(apiPrefix, userRouter);
  app.use(apiPrefix, questionnaireRouter);
  app.use(apiPrefix, adminRouter);
  app.use(apiPrefix, bankRouter);
  app.post(
    "/api/login",
    passport.authenticate("local", {
      failureRedirect: "/api/err_login",
      successRedirect: "/api/login_success"
    })
  );
  app.get("/api/login_success", (req, res) => {
    const {
      user: { userId }
    } = req;
    let table;
    if (req.user.authId !== undefined) {
      table = AuthClient;
    } else {
      table = Client;
    }
    UserServices._findById(userId, table).then(user => {
      const {
        setuptracker: { connection, stepOne, stepTwo, stepThree }
      } = user;
      const setupTracking = { connection, stepOne, stepTwo, stepThree };
      return res.status(200).json({
        success: true,
        message: "Successful login. Redirecting...",
        setupTracking
      });
    });
  });
  app.get("/api/err_login", (_, res) => {
    return res.status(400).json({
      success: false,
      message: "Wrong credentials"
    });
  });
  app.get(
    "/api/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      const {
        user: { type }
      } = req;
      if (type === "internal") {
        return res.redirect("http://localhost:3000/clients-dashboard");
      }
      res.redirect("http://localhost:3000/google_callback");
    }
  );
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000");
  });
  app.get("/test", (_, res) => {
    UserServices._findById(1, AuthClient).then(user => {
      return res.send(user)
    })
  })

  return app;
};

module.exports = routes;













