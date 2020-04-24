const sequelize = require("sequelize");
const models = require("../database/models");

const { Bank } = models;

class BankServices {
  static async _addBank(country, bank) {
    const banks = await Bank.create({
      country,
      banks: [bank]
    });

    return banks;
  }

  static async _updateBankList(country, bank) {
    const banks = await Bank.findOne({
      where: { country }
    });

    banks.update({
      banks: sequelize.fn("array_append", sequelize.col("banks"), bank)
    });

    return banks;
  }

  static async _getBanks(country) {
    const banks = await Bank.findOne({
      where: { country }
    });

    return banks;
  }
}

module.exports = BankServices;
