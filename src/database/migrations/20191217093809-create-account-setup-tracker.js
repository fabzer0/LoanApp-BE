module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("AccountSetupTrackers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      authId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      connection: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      stepOne: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      stepTwo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      stepThree: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      console.log('Created AccountSetupTracking table')
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable("AccountSetupTrackers").then(() => {
      console.log('Dropped AccountSetupTracking table')
    })
  }
};
