module.exports = (sequelize, DataTypes) => {
  const Oauth2Token = sequelize.define('Oauth2Token', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    realmId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});

  Oauth2Token.associate = ({ Client, AuthClient }) => {
    Oauth2Token.belongsTo(Client, {
      as: 'client',
      foreignKey: 'clientId',
      foreignKeyConstraint: true
    })
    Oauth2Token.belongsTo(AuthClient, {
      as: 'authclient',
      foreignKey: 'clientId',
      foreignKeyConstraint: true
    })

  };
  
  return Oauth2Token;
};