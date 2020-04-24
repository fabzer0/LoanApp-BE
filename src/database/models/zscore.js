module.exports = (sequelize, DataTypes) => {
  const ZScore = sequelize.define('ZScore', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    ebitByTotalAssets: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    netSalesByTotalAssets: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    bookValueEquityByTotalLiabilities: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    workingCapitalByTotalAssets: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    retainedEarningsByTotalAssets: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {});

  ZScore.associate = models => {};

  return ZScore;
};