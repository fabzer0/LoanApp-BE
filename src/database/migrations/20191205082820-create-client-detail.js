module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ClientDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      respondent: {
        type: Sequelize.STRING,
        allowNull: true
      },
      positionInCompany: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phoneNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      emailAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dateOfIncorporation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      legalForm: {
        type: Sequelize.STRING,
        allowNull: true
      },
      industry: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ceo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ceoGender:{
        type: Sequelize.STRING,
        allowNull: true
      },
      ceoCountryOfBirth: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ceoDateOfBirth: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastYearTurnOver: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastMonthTurnOver: {
        type: Sequelize.STRING,
        allowNull: true
      },
      companyActivities: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      fteCount: {
        type: Sequelize.STRING,
        allowNull: true
      },
      debtFundingRequired: {
        type: Sequelize.STRING,
        allowNull: true
      },
      desiredUseOfDebtProceeds: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      proposedGuarantees: {
        type: Sequelize.STRING,
        allowNull: true
      },
      product: {
        type: Sequelize.STRING,
        allowNull: true
      },
      existingLenders: {
        type: Sequelize.STRING,
        allowNull: true
      },
      noOfLenders: {
        type: Sequelize.STRING,
        allowNull: true
      },
      externalOrInternalAccountant: {
        type: Sequelize.STRING,
        allowNull: true
      },
      accountantPhoneNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nameOfAccountant: {
        type: Sequelize.STRING,
        allowNull: true
      },
      onlineAccounting: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nameOfAccountingSystem: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mostDepositBank: {
        type: Sequelize.STRING,
        allowNull: true
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
      console.log('ClientDetails table created')
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('ClientDetails').then(() => {
      console.log('ClientDetails table dropped')
    })
  }
};