module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define(
    "Bank",
    {
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      banks: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      }
    },
    {}
  );
  Bank.associate = models => {};

  return Bank;
};
