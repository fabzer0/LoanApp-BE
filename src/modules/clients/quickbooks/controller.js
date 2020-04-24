const OAuthClient = require("intuit-oauth");
const QuickBooks = require("node-quickbooks");
const Oauth2Services = require("../../../services/oauth2");
const AccountSetupServices = require("../../../services/accounttracker");
const ZScoreServices = require("../../../services/zscore");
const { quickbooksTokenData } = require("../../../utils/auth");
const {
  quickbooksClientId,
  quickbooksClientSecret,
  quickbooksRedirectUri,
  quickbooksEnvironment,
  useSandbox
} = require("../../../config/keys");
const {
  destructureBalanceSheet,
  destructureProfitAndLoss,
  refreshOauthToken
} = require("../../../helpers/quickbooks");

const oauthClient = new OAuthClient({
  clientId: quickbooksClientId,
  clientSecret: quickbooksClientSecret,
  environment: quickbooksEnvironment,
  redirectUri: quickbooksRedirectUri
});

class QuickBooksController {
  static integrateQuickBooks(_, res) {
    try {
      const authUri = oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting],
        state: "state"
      });
      return res.redirect(authUri);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Oops! Something went wrong. Please try again later.",
        error: error.message
      });
    }
  }

  static retrieveAccessToken(req, res) {
    const {
      query: { url },
      user: { userId }
    } = req;
    oauthClient
      .createToken(url)
      .then(authResponse => {
        const tokenData = authResponse.getToken();
        const { access_token, refresh_token, realmId } = tokenData;
        Oauth2Services._saveOauthData(
          userId,
          access_token,
          refresh_token,
          realmId
        ).then(response => {
          const {
            _options: { isNewRecord },
            dataValues
          } = response;
          const quickbooksData = quickbooksTokenData(dataValues);
          if (isNewRecord) {
            AccountSetupServices.updateConnection(userId).then(() => {
              return res.status(200).json({
                success: true,
                message: "You have successfully connected your account",
                quickbooks: quickbooksData
              });
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Your account is already connected",
              quickbooks: quickbooksData
            });
          }
        });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Oops! Something went wrong. Please try again later."
        });
      });
  }

  static async getInformation(req, res) {
    try {
      const {
        query: { realmId: companyId, start_date, end_date }
      } = req;
      const period = { start_date, end_date };
      const response = await Oauth2Services._findTokens(companyId);
      const { accessToken, refreshToken, realmId } = response;
      const qbo = new QuickBooks(
        quickbooksClientId,
        quickbooksClientSecret,
        accessToken,
        false, // no token secret for oAuth 2.0
        realmId,
        useSandbox, // use the sandbox?
        false, // enable debugging?
        null, // set minorversion, or null for the latest version
        "2.0" //oAuth version
      );
      let qboReports = [];
      qbo.reportBalanceSheet(period, (err, balanceSheet) => {
        if (err) {
          console.log(err);
          return refreshOauthToken(res, refreshToken, realmId, oauthClient);
        } else {
          const {
            totalAssets,
            totalLiabilities,
            totalCurrentAssets,
            totalCurrentLiabilities,
            equity,
            retainedEarnings
          } = destructureBalanceSheet(balanceSheet);
          const $workingCapital =
            +totalCurrentAssets - +totalCurrentLiabilities;
          const workingCapital = $workingCapital.toFixed(2);
          qboReports.push({
            totalAssets,
            totalLiabilities,
            equity,
            retainedEarnings,
            workingCapital
          });
          qbo.reportProfitAndLoss(period, (err, profitLoss) => {
            if (err) {
              console.log(err);
              return refreshOauthToken(res, refreshToken, realmId, oauthClient);
            } else {
              const { sales, EBIT } = destructureProfitAndLoss(profitLoss);
              const ebitByTotalRatioValue = +EBIT / +totalAssets;
              const salesByTotalAssetsRatioValue = +sales / +totalAssets;
              const equityByTotalLiabilitiesRatioValue =
                +equity / +totalLiabilities;
              const workingCaByTotalAssetsRatioValue =
                +workingCapital / +totalAssets;
              const retainedEarningsByTotalAssetsRatioValue =
                +retainedEarnings / +totalAssets;
              ZScoreServices._getZscore("Standard").then(response => {
                const {
                  ebitByTotalAssets,
                  netSalesByTotalAssets,
                  bookValueEquityByTotalLiabilities,
                  workingCapitalByTotalAssets,
                  retainedEarningsByTotalAssets
                } = response;
                const zscore = {
                  ebitByTotalAssets: {
                    ratioValue: ebitByTotalRatioValue.toFixed(2),
                    weight: (ebitByTotalRatioValue * ebitByTotalAssets).toFixed(
                      2
                    ),
                    defaultWeight: ebitByTotalAssets.toString()
                  },
                  netSalesByTotalAssets: {
                    ratioValue: salesByTotalAssetsRatioValue.toFixed(2),
                    weight: (
                      salesByTotalAssetsRatioValue * netSalesByTotalAssets
                    ).toFixed(2),
                    defaultWeight: netSalesByTotalAssets.toString()
                  },
                  bookValueEquityByTotalLiabilities: {
                    ratioValue: equityByTotalLiabilitiesRatioValue.toFixed(2),
                    weight: (
                      equityByTotalLiabilitiesRatioValue *
                      bookValueEquityByTotalLiabilities
                    ).toFixed(2),
                    defaultWeight: bookValueEquityByTotalLiabilities.toString()
                  },
                  workingCapitalByTotalAssets: {
                    ratioValue: workingCaByTotalAssetsRatioValue.toFixed(2),
                    weight: (
                      workingCaByTotalAssetsRatioValue *
                      workingCapitalByTotalAssets
                    ).toFixed(2),
                    defaultWeight: workingCapitalByTotalAssets.toString()
                  },
                  retainedEarningsByTotalAssets: {
                    ratioValue: retainedEarningsByTotalAssetsRatioValue.toFixed(
                      2
                    ),
                    weight: (
                      retainedEarningsByTotalAssetsRatioValue *
                      retainedEarningsByTotalAssets
                    ).toFixed(2),
                    defaultWeight: retainedEarningsByTotalAssets.toString()
                  }
                };
                qboReports.push({
                  sales,
                  EBIT,
                  zscore
                });

                return res.status(200).json({
                  success: true,
                  qboReports
                });
              });
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Oops! Something went wrong. Please try again later."
      });
    }
  }
}

module.exports = QuickBooksController;
