module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Oauth2Tokens', {
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
      accessToken: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: false
      },
      realmId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
      console.log('Created Oauth2Token table')
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable('Oauth2Tokens').then(() => {
      console.log('Dropped Oauth2Token table')
    })
  }
};