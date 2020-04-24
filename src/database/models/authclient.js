module.exports = (sequelize, DataTypes) => {
  const AuthClient = sequelize.define(
    "AuthClient",
    {
      authId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      preQualified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      qualified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      dateApproved: {
        type: DataTypes.DATE,
        allowNull: true
      },
      accountingSoftware: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );
  AuthClient.associate = ({
    Oauth2Token,
    ClientDetail,
    AccountSetupTracker
  }) => {
    AuthClient.hasMany(Oauth2Token, {
      as: "oauth2tokens",
      foreignKey: "clientId",
      foreignKeyConstraint: true,
      onDelete: "cascade"
    });
    AuthClient.hasOne(ClientDetail, {
      as: "clientdetail",
      foreignKey: "clientId",
      foreignKeyConstraint: true,
      onDelete: "cascade"
    });
    AuthClient.hasOne(AccountSetupTracker, {
      as: "setuptracker",
      foreignKey: "clientId"
    });
  };

  return AuthClient;
};
