module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Clients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
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
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      accountingSoftware: {
        type: Sequelize.STRING,
        allowNull: true,
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
      console.log('Created Clients table')
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable("Clients").then(() => {
      console.log('Dropped Clients table')
    })
  }
};
