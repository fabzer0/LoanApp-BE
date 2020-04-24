module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("ZScores", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        ebitByTotalAssets: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        netSalesByTotalAssets: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        bookValueEquityByTotalLiabilities: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        workingCapitalByTotalAssets: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        retainedEarningsByTotalAssets: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        console.log("ZScore table created.");
      });
  },
  down: queryInterface => {
    return queryInterface.dropTable("ZScores").then(() => {
      console.log("ZScore table dropped.");
    });
  }
};
