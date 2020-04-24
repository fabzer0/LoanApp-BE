const models = require("../database/models");

const { ClientDetail } = models;

class ClientDetailsService {
  static async _fillStepOneDetails(
    clientId,
    companyName,
    respondent,
    positionInCompany,
    phoneNo,
    emailAddress,
    country,
    dateOfIncorporation,
    legalForm,
    industry
  ) {
    const response = await ClientDetail.create({
      clientId,
      companyName,
      respondent,
      positionInCompany,
      phoneNo,
      emailAddress,
      country,
      dateOfIncorporation,
      legalForm,
      industry
    });

    return response.dataValues;
  }

  static async _fillStepTwoDetails(
    clientId,
    ceo,
    ceoGender,
    ceoCountryOfBirth,
    ceoDateOfBirth,
    lastYearTurnOver,
    lastMonthTurnOver,
    companyActivities,
    fteCount,
    debtFundingRequired,
    desiredUseOfDebtProceeds,
    proposedGuarantees
  ) {
    const client = await ClientDetail.findOne({
      where: { clientId }
    });

    client.update({
      ceo,
      ceoGender,
      ceoCountryOfBirth,
      ceoDateOfBirth,
      lastYearTurnOver,
      lastMonthTurnOver,
      companyActivities,
      fteCount,
      debtFundingRequired,
      desiredUseOfDebtProceeds,
      proposedGuarantees
    });

    return client.dataValues;
  }

  static async _fillStepThreeDetails(
    clientId,
    product,
    existingLenders,
    noOfLenders,
    externalOrInternalAccountant,
    accountantPhoneNo,
    nameOfAccountant,
    onlineAccounting,
    nameOfAccountingSystem,
    mostDepositBank
  ) {
    const client = await ClientDetail.findOne({
      where: { clientId }
    });

    client.update({
      product,
      existingLenders,
      noOfLenders,
      externalOrInternalAccountant,
      accountantPhoneNo,
      nameOfAccountant,
      onlineAccounting,
      nameOfAccountingSystem,
      mostDepositBank
    });

    return client.dataValues;
  }

  static async _getClientDetails(clientId) {
    const details = await ClientDetail.findOne({
      where: { clientId }
    });

    return details.dataValues;
  }
}

module.exports = ClientDetailsService;
