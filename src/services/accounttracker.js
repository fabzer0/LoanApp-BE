const models = require("../database/models");

const { AccountSetupTracker } = models;

class AccountSetupServices {
  static async createDefault(clientId) {
    await AccountSetupTracker.create({
      clientId
    });
  }

  static async updateConnection(clientId) {
    const track = await AccountSetupTracker.findOne({
      where: { clientId }
    });

    track.update({ connection: true });
  }

  static async updateStepOne(clientId) {
    const track = await AccountSetupTracker.findOne({
      where: { clientId }
    });

    track.update({ stepOne: true });
  }

  static async updateStepTwo(clientId) {
    const track = await AccountSetupTracker.findOne({
      where: { clientId }
    });

    track.update({ stepTwo: true });
  }

  static async updateStepThree(clientId) {
    const track = await AccountSetupTracker.findOne({
      where: { clientId }
    });

    track.update({ stepThree: true });
  }
}

module.exports = AccountSetupServices;
