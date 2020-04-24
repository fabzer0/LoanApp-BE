module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AccountVerificationTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      token: {
        type: Sequelize.STRING,
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
    }).then(() => {
      console.log('AccountVerificationToken table created')
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable('AccountVerificationTokens').then(() => {
      console.log('AccountVerificationToken table dropped')
    })
  }
};