const UserService = require("../../services/users");
const ZScoreServices = require("../../services/zscore");

class AdminController {
  static async getAllClients(req, res) {
    try {
      const clients = await UserService._getAllClients();
      return res.status(200).json({
        success: true,
        clients
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Oops! Something went wrong. Please try again later"
      });
    }
  }

  static async getClientProfile(req, res) {
    try {
      const {
        query: { clientId }
      } = req;
      const client = await UserService._getOneClient(clientId);
      return res.status(200).json({
        success: true,
        client
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Oops! Something went wrong. Pleas try again later"
      });
    }
  }

  static async updateZscore(req, res) {
    try {
      const {
        body: {
          ebitByTotalAssets,
          netSalesByTotalAssets,
          bookValueEquityByTotalLiabilities,
          workingCapitalByTotalAssets,
          retainedEarningsByTotalAssets
        },
        query: { type }
      } = req;

      const zscore = await ZScoreServices._updateZscore(
        type,
        ebitByTotalAssets,
        netSalesByTotalAssets,
        bookValueEquityByTotalLiabilities,
        workingCapitalByTotalAssets,
        retainedEarningsByTotalAssets
      );
      return res.status(200).json({
        success: true,
        zscore
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Oops! Something went wrong. Please try again later."
      });
    }
  }

  static async companyZscore(req, res) {
    try {
      const {
        query: { type }
      } = req;
      const {
        ebitByTotalAssets,
        netSalesByTotalAssets,
        bookValueEquityByTotalLiabilities,
        workingCapitalByTotalAssets,
        retainedEarningsByTotalAssets
      } = await ZScoreServices._getZscore(type);
      return res.status(200).json({
        success: true,
        standardScore: {
          ebitByTotalAssets,
          netSalesByTotalAssets,
          bookValueEquityByTotalLiabilities,
          workingCapitalByTotalAssets,
          retainedEarningsByTotalAssets
        }
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

module.exports = AdminController;
