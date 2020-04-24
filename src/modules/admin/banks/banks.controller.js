const BankServices = require("../../../services/banks");

class BanksController {
  static async addBank(req, res) {
    try {
      const {
        body: { country, bank }
      } = req;
      const banks = await BankServices._addBank(country, bank);
      return res.status(201).json({
        success: true,
        message: "That was successful",
        banks
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Oops! Something went wrong. Please try again later."
      });
    }
  }

  static async updateBankList(req, res) {
    try {
      const {
        query: { country },
        body: { bank }
      } = req;
      const banks = await BankServices._updateBankList(country, bank);
      return res.status(200).json({
        success: true,
        message: "That update was successful",
        banks
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Oops! Something went wrong. Please try again later."
      });
    }
  }

  static async getBanks(req, res) {
    try {
      const {
        query: { country }
      } = req;
      const {
        dataValues: { banks }
      } = await BankServices._getBanks(country);
      if (!banks) {
        return res.status(400).json({
          success: false,
          message: "The country provided is not available"
        });
      }
      return res.status(200).json({
        success: true,
        message: "That was successful",
        banks
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Oops! Something went wrong. Please try again later."
      });
    }
  }
}

module.exports = BanksController;
