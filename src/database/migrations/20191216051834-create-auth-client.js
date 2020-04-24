module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AuthClients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      preQualified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      qualified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      dateApproved: {
        type: Sequelize.DATE,
        allowNull: true
      },
      accountingSoftware: {
        type: Sequelize.STRING,
        allowNull: true
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
      console.log('Created AuthClients table.')
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AuthClients').then(() => {
      console.log('Dropped AuthClients table.')
    })
  }
};