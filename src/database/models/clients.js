module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
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
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      accountingSoftware: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );

  Client.associate = ({
    Oauth2Token,
    AccountVerificationToken,
    ClientDetail,
    AccountSetupTracker
  }) => {
    Client.hasMany(Oauth2Token, {
      as: "oauth2tokens",
      foreignKey: "clientId",
      foreignKeyConstraint: true,
      onDelete: "cascade"
    });
    Client.hasOne(AccountVerificationToken, {
      as: "accountverificationtoken",
      foreignKey: "clientId",
      foreignKeyConstraint: true
    });
    Client.hasOne(ClientDetail, {
      as: "clientdetail",
      foreignKey: "clientId",
      foreignKeyConstraint: true,
      onDelete: "cascade"
    });
    Client.hasOne(AccountSetupTracker, {
      as: "setuptracker",
      foreignKey: "clientId"
    });
  };

  return Client;
};
