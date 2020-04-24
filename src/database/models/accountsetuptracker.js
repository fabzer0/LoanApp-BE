module.exports = (sequelize, DataTypes) => {
  const AccountSetupTracker = sequelize.define(
    "AccountSetupTracker",
    {
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      connection: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      stepOne: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      stepTwo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      stepThree: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {}
  );

  AccountSetupTracker.associate = ({ Client, AuthClient }) => {
    AccountSetupTracker.belongsTo(Client, {
      as: "client",
      foreignKey: "clientId"
    });
    AccountSetupTracker.belongsTo(AuthClient, {
      as: "authclient",
      foreignKey: "clientId"
    })
  };

  return AccountSetupTracker;
};
