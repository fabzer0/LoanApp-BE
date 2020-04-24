const models = require("../database/models");

const { ZScore } = models;

class ZScoreServices {
  static async _updateZscore(
    type,
    ebitByTotalAssets,
    netSalesByTotalAssets,
    bookValueEquityByTotalLiabilities,
    workingCapitalByTotalAssets,
    retainedEarningsByTotalAssets
  ) {
    const zscore = await ZScore.findOne({
      where: { type }
    });
    zscore.update({
      ebitByTotalAssets,
      netSalesByTotalAssets,
      bookValueEquityByTotalLiabilities,
      workingCapitalByTotalAssets,
      retainedEarningsByTotalAssets
    });

    return zscore.dataValues;
  }

  static async _getZscore(type) {
    const zscore = await ZScore.findOne({
      where: { type }
    });

    return zscore.dataValues;
  }
}

module.exports = ZScoreServices;
