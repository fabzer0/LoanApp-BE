module.exports = (sequelize, DataTypes) => {
  const ClientDetail = sequelize.define(
    "ClientDetail",
    {
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      respondent: {
        type: DataTypes.STRING,
        allowNull: true
      },
      positionInCompany: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: true
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true
      },
      dateOfIncorporation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      legalForm: {
        type: DataTypes.STRING,
        allowNull: true
      },
      industry: {
        type: DataTypes.STRING,
        allowNull: true
      },
      ceo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      ceoGender:{
        type: DataTypes.STRING,
        allowNull: true
      },
      ceoCountryOfBirth: {
        type: DataTypes.STRING,
        allowNull: true
      },
      ceoDateOfBirth: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lastYearTurnOver: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lastMonthTurnOver: {
        type: DataTypes.STRING,
        allowNull: true
      },
      companyActivities: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      fteCount: {
        type: DataTypes.STRING,
        allowNull: true
      },
      debtFundingRequired: {
        type: DataTypes.STRING,
        allowNull: true
      },
      desiredUseOfDebtProceeds: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      proposedGuarantees: {
        type: DataTypes.STRING,
        allowNull: true
      },
      product: {
        type: DataTypes.STRING,
        allowNull: true
      },
      existingLenders: {
        type: DataTypes.STRING,
        allowNull: true
      },
      noOfLenders: {
        type: DataTypes.STRING,
        allowNull: true
      },
      externalOrInternalAccountant: {
        type: DataTypes.STRING,
        allowNull: true
      },
      accountantPhoneNo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      nameOfAccountant: {
        type: DataTypes.STRING,
        allowNull: true
      },
      onlineAccounting: {
        type: DataTypes.STRING,
        allowNull: true
      },
      nameOfAccountingSystem: {
        type: DataTypes.STRING,
        allowNull: true
      },
      mostDepositBank: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );

  ClientDetail.associate = ({ Client, AuthClient }) => {
    ClientDetail.belongsTo(Client, {
      as: "client",
      foreignKey: "clientId",
      foreignKeyConstraint: true
    });
    ClientDetail.belongsTo(AuthClient, {
      as: "authclient",
      foreignKey: "clientId",
      foreignKeyConstraint: true
    });
  };

  return ClientDetail;
};
