module.exports = (sequelize, DataTypes) => {
  const AccountVerificationToken = sequelize.define(
    "AccountVerificationToken",
    {
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );

  AccountVerificationToken.associate = ({ Client }) => {
    AccountVerificationToken.belongsTo(Client, {
      as: "client",
      foreignKey: "clientId",
      foreignKeyConstraint: true,
    });
  };

  return AccountVerificationToken;
};