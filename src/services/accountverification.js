const crypto = require("crypto-random-string");
const { Op } = require("sequelize");
const AccountVerificationHelper = require("../helpers/nodemailer");
const models = require("../database/models");

const { AccountVerificationToken } = models;

class AccountVerificationServices {
  static async sendEmailToken(id, email, use) {
    try {
      const result = await AccountVerificationToken.create({
        clientId: id,
        token: crypto({ length: 16, type: "base64" })
      });

      const {
        dataValues: { token }
      } = result;
      await AccountVerificationHelper.sendVerificationEmail(email, token, use);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  static async findToken(clientId, token) {
    const verificationToken = await AccountVerificationToken.findOne({
      where: {
        [Op.or]: [{ clientId }, { token }]
      }
    });
    if (!verificationToken) {
      return undefined;
    }

    return verificationToken.dataValues;
  }
}

module.exports = AccountVerificationServices;
