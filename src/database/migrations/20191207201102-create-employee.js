module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Employees", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        googleId: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        publish: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        write: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        read: {
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
      })
      .then(() => console.log("Employess table created"));
  },
  down: queryInterface => {
    return queryInterface.dropTable("Employees").then(() => {
      console.log("Dropped Employess table");
    });
  }
};
