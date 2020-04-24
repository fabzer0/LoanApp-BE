const jwt = require("jsonwebtoken");
const AccountVerificationServices = require("../../../services/accountverification");
const UserService = require("../../../services/users");
const AccountSetupServices = require("../../../services/accounttracker");
const { appSecret } = require("../../../config/keys");
const AccountVerificationHelper = require("../../../helpers/nodemailer");

class UserController {
  static async register(req, res) {
    try {
      const {
        body: { firstname, lastname, email, password }
      } = req;
      const {
        _options: { isNewRecord },
        dataValues
      } = await UserService._findOrCreateUser(
        firstname,
        lastname,
        email,
        password
      );

      if (isNewRecord) {
        const use = "registration";
        await AccountVerificationServices.sendEmailToken(
          dataValues.id,
          dataValues.email,
          use
        );
        await AccountSetupServices.createDefault(dataValues.id);
        return res.status(201).json({
          success: true,
          message: "Check your email for account verification"
        });
      }
      return res.status(409).json({
        success: false,
        message: "Email or Phone Number exists"
      });
    } catch (error) {
      console.log(error);
      return status(500).json({
        success: false,
        message: "Oops! Something went wrong. Please try again later"
      });
    }
  }

  static async verifyEmail(req, res) {
    const {
      query: { email, token }
    } = req;
    try {
      const client = await UserService._findByEmail(email);
      if (client === undefined) {
        return res.status(404).json({
          success: false,
          message: "Email not found."
        });
      }
      if (client.isActive) {
        return res.status(202).json({
          success: true,
          message: "Account Already Verified.",
          setupTracking: {
            connection: null,
            stepOne: null,
            stepTwo: null,
            stepThree: null
          }
        });
      }
      const verificationToken = await AccountVerificationServices.findToken(
        client.id,
        token
      );
      if (verificationToken === undefined) {
        return res.status(404).json({
          success: false,
          message: "Oops! Your verification link has expired."
        });
      }
      await UserService.updateIsActive(verificationToken.clientId);
      return res.status(200).json({
        success: true,
        message: "Email address verified",
        setupTracking: {
          connection: null,
          stepOne: null,
          stepTwo: null,
          stepThree: null
        }
      });
    } catch (e) {
      console.log(e);
      return res.status(403).json({
        success: false,
        error: "Oops! Something went wrong. Please try again later"
      });
    }
  }

  static async forgotPassword(req, res) {
    try {
      const {
        body: { email }
      } = req;
      const client = await UserService._findByEmail(email);

      if (!client) {
        return res.status(404).json({
          success: false,
          message: "Client with this email address was not found."
        });
      }
      const token = jwt.sign({ email }, appSecret, {
        expiresIn: "3h"
      });

      const use = "password_reset";
      await AccountVerificationHelper.sendVerificationEmail(email, token, use);
      return res.status(200).json({
        success: true,
        message: "Kindly check your email for password reset link."
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Oops! Something went wrong. Please try again later"
      });
    }
  }

  static async resetPassword(req, res) {
    try {
      const {
        query: { token },
        body: { password }
      } = req;
      const decoded = jwt.verify(token, appSecret);
      if (decoded.email) {
        const { email } = decoded;
        const client = await UserService._findByEmail(email);
        if (!client) {
          return res.status(404).json({
            success: false,
            message: "Client with this email address was not found."
          });
        }

        await UserService._resetPassword(email, password);
        return res.status(201).json({
          success: true,
          message: "Password reset was successful"
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "This link is expired. Kindly request for another one"
      });
    }
  }
}

module.exports = UserController;
