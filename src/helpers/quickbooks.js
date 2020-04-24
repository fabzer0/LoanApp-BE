const Oauth2Services = require("../services/oauth2");
const destructureBalanceSheet = balanceSheet => {
  const {
    Rows: {
      Row: [
        {
          Summary: {
            ColData: [, { value: totalAssets }]
          },
          Rows: {
            Row: [
              {
                Summary: {
                  ColData: [, { value: totalCurrentAssets }]
                }
              }
            ]
          }
        },
        {
          Rows: {
            Row: [
              {
                Summary: {
                  ColData: [, { value: totalLiabilities }]
                },
                Rows: {
                  Row: [
                    {
                      Summary: {
                        ColData: [, { value: totalCurrentLiabilities }]
                      }
                    }
                  ]
                }
              },
              {
                Summary: {
                  ColData: [, { value: equity }]
                },
                Rows: {
                  Row: [
                    ,
                    {
                      ColData: [, { value: retainedEarnings }]
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  } = balanceSheet;

  return {
    totalAssets,
    totalLiabilities,
    equity,
    retainedEarnings,
    totalCurrentAssets,
    totalCurrentLiabilities
  };
};

const destructureProfitAndLoss = profitLoss => {
  const {
    Rows: {
      Row: [
        {
          Summary: {
            ColData: [, { value: sales }]
          }
        },
        ,
        {
          Summary: {
            ColData: [, { value: EBIT }]
          }
        }
      ]
    }
  } = profitLoss;

  return { sales, EBIT };
};

const refreshOauthToken = (res, refreshToken, realmId, oauthClient) => {
  oauthClient
    .refreshUsingToken(refreshToken)
    .then(authResponse => {
      const tokenData = authResponse.getToken();
      const { access_token, refresh_token } = tokenData;
      Oauth2Services._updateTokens(realmId, access_token, refresh_token).then(
        _ => {
          return res.redirect("/api/v1/retrieve_company_info");
        }
      );
    })
    .catch(error => {
      console.log(error);
      return "Error"
    });
};

module.exports = {
  destructureBalanceSheet,
  destructureProfitAndLoss,
  refreshOauthToken
};
