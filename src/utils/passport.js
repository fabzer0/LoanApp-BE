const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const models = require("../database/models");
const {
  sessionizeClient,
  sessionizeUser,
  sessionizeAuthClient
} = require("../utils/auth");
const { googleClientId, googleClientSecret } = require("../config/keys");
const AccountSetupServices = require("../services/accounttracker");

const { Employee, Client, AuthClient } = models;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    Client.findOne({
      where: { email }
    })
      .then(client => {
        if (!client) {
          done(null, false);
        } else {
          bcrypt
            .compare(password, client.dataValues.password)
            .then(isValidPWD => {
              if (!isValidPWD) {
                done(null, false);
              } else {
                const sessionClient = sessionizeClient(client.dataValues);
                done(null, sessionClient);
              }
            });
        }
      })
      .catch(err => {
        done(err);
      });
  })
);

const googleConfig = {
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: "/api/auth/google/callback"
};

passport.use(
  new GoogleStrategy(googleConfig, (_, __, profile, done) => {
    const {
      id,
      _json: { email }
    } = profile;
    const checkMailDomain = new RegExp(
      /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(finlo)\.ai$/,
      "g"
    );
    if (checkMailDomain.test(email)) {
      Employee.findOne({
        where: { googleId: id }
      })
        .then(employee => {
          if (employee) {
            const sessionUser = sessionizeUser(employee.dataValues);
            done(null, sessionUser);
          } else {
            Employee.create({
              googleId: id,
              email
            }).then(employee => {
              const sessionUser = sessionizeUser(employee.dataValues);
              done(null, sessionUser);
            });
          }
        })
        .catch(err => {
          done(err);
        });
    } else {
      AuthClient.findOne({
        where: { authId: id }
      })
        .then(client => {
          if (client) {
            const sessionClient = sessionizeAuthClient(client.dataValues);
            done(null, sessionClient);
          } else {
            AuthClient.create({
              authId: id,
              email
            }).then(client => {
              const { id } = client.dataValues;
              AccountSetupServices.createDefault(id);
              const sessionClient = sessionizeAuthClient(client.dataValues);
              done(null, sessionClient);
            });
          }
        })
        .catch(error => {
          done(error);
        });
    }
  })
);
