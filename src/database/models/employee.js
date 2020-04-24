module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    googleId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    publish: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    write: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});
  Employee.associate = () => {
    // associations can be defined here
  };
  return Employee;
};