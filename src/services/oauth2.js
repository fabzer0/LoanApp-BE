const models = require("../database/models");

const { Oauth2Token } = models;

class Oauth2Services {
  static async _saveOauthData(clientId, accessToken, refreshToken, realmId) {
    const [result] = await Oauth2Token.findOrCreate({
      where: { realmId },
      defaults: {
        clientId,
        accessToken,
        refreshToken,
        realmId
      }
    });

    return result;
  }

  static async _findTokens(realmId) {
    const result = await Oauth2Token.findOne({
      where: { realmId }
    });

    return result.dataValues;
  }

  static async _updateTokens(realmId, accessToken, refreshToken) {
    const auth = await Oauth2Token.findOne({
      where: { realmId }
    });
    auth.update({ accessToken, refreshToken });

    return auth.dataValues;
  }
}

module.exports = Oauth2Services;
