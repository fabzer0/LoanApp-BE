module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Banks", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        country: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        banks: {
          type: Sequelize.ARRAY(Sequelize.STRING),
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
        console.log("Banks table created");
      });
  },
  down: queryInterface => {
    return queryInterface.dropTable("Banks").then("Banks table dropped");
  }
};
