const bcrypt = require("bcryptjs");
const models = require("../database/models");

const { Client, ClientDetail, AccountSetupTracker, Oauth2Token } = models;

class UserService {
  static async _findOrCreateUser(firstname, lastname, email, password) {
    const hashPWD = await bcrypt.hash(password, 10);
    const [client] = await Client.findOrCreate({
      where: { email },
      defaults: {
        firstname,
        lastname,
        email,
        password: hashPWD
      }
    });

    delete client.dataValues["password"];

    return client;
  }

  static async _findByEmail(email) {
    const client = await Client.findOne({
      where: { email }
    });

    if (!client) {
      return undefined;
    }

    return client.dataValues;
  }

  static async updateIsActive(id) {
    const client = await Client.findByPk(id);
    client.update({ isActive: true });
    return client.dataValues;
  }

  static async _getAllClients() {
    const clients = await Client.findAll();

    return clients;
  }

  static async _resetPassword(email, password) {
    const hashPWD = await bcrypt.hash(password, 10);
    const client = await Client.findOne({
      where: { email }
    });

    client.update({ password: hashPWD });
    return client;
  }

  static async _getOneClient(id) {
    const client = await Client.findOne({
      where: { id },
      include: [
        {
          model: ClientDetail,
          as: "clientdetail"
        },
        {
          model: Oauth2Token,
          as: "oauth2tokens"
        }
      ]
    });

    return client;
  }

  static async _findById(id, table) {
    const user = await table.findOne({
      where: { id },
      include: [
        {
          model: AccountSetupTracker,
          as: "setuptracker"
        }
      ]
    });

    return user.dataValues;
  }
}

module.exports = UserService;
