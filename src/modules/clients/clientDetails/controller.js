const ClientDetailsServices = require("../../../services/clientDetails");
const AccountSetupServices = require('../../../services/accounttracker');

class ClientDetailsController {
  static async fillStepOneDetails(req, res) {
    try {
      if (req.user) {
        const {
          body: {
            companyName,
            respondent,
            positionInCompany,
            phoneNo,
            emailAddress,
            country,
            dateOfIncorporation,
            legalForm,
            industry
          },
          user: { userId }
        } = req;
        const response = await ClientDetailsServices._fillStepOneDetails(
          userId,
          companyName,
          respondent,
          positionInCompany,
          phoneNo,
          emailAddress,
          country,
          dateOfIncorporation,
          legalForm,
          industry
        );
        
        await AccountSetupServices.updateStepOne(userId);
        return res.status(200).json({
          success: true,
          message: 'Step one completed.',
          clientDetails: response
        })
      } else {
        return res.status(401).json({
          success: false,
          message: 'You are not authorized'
        })
      } 
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Oops! Something went wrong. Please try again later'
      })
    }
  }

  static async fillStepTwoDetails(req, res) {
    try {
      if (req.user) {
        const {
          body: {
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
          },
          user: { userId }   
        } = req;
  
        const response = await ClientDetailsServices._fillStepTwoDetails(
          userId,
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
        );
        
        await AccountSetupServices.updateStepTwo(userId);
        return res.status(200).json({
          success: true,
          message: 'Step two completed.',
          clientDetails: response
        })
      } else {
        return res.status(401).json({
          success: false,
          message: 'You are not authorized'
        })
      }   
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Oops! Something went wrong. Please try again later'
      })
    }
  }

  static async fillStepThreeDetails(req, res) {
    try {
      if (req.user) {
        const {
          body: {
            product,
            existingLenders,
            noOfLenders,
            externalOrInternalAccountant,
            accountantPhoneNo,
            nameOfAccountant,
            onlineAccounting,
            nameOfAccountingSystem,
            mostDepositBank
          },
          user: { userId }
        } = req;
  
        const response = await ClientDetailsServices._fillStepThreeDetails(
          userId,
          product,
          existingLenders,
          noOfLenders,
          externalOrInternalAccountant,
          accountantPhoneNo,
          nameOfAccountant,
          onlineAccounting,
          nameOfAccountingSystem,
          mostDepositBank
        );
        
        await AccountSetupServices.updateStepThree(userId);
        return res.status(200).json({
          success: true,
          message: 'Step three completed.',
          clientDetails: response
        })
      } else {
        return res.status(401).json({
          success: false,
          message: 'You are not authorized'
        })
      }  
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Oops! Something went wrong. Please try again later'
      })
    }
  }

  static async getClientDetails(req, res) {
    try {
      if (req.user) {
        const {
          user: { userId }
        } = req;
        const response = await ClientDetailsServices._getClientDetails(userId)
        return res.status(200).json({
          success: true,
          message: 'Success',
          clientDetails: response
        })
      } else {
        return res.status(401).json({
          success: false,
          message: 'You are not authorized'
        })
      }  
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: 'Oops! Something went wrong. Please try again later'
      })
    }
  }
}

module.exports = ClientDetailsController;
