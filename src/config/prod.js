require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  databaseDialect: process.env.DIALECT,
  appSecret: process.env.APP_SECRET,
  baseUrl: process.env.BASE_URL,
  frontendBaseUrl: process.env.FRONTEND_BASE_URL,
  gmailAccount: process.env.GMAIL_ACCOUNT,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
  googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  quickbooksClientId: process.env.QUICKBOOKS_CLIENT_ID,
  quickbooksClientSecret: process.env.QUICKBOOKS_CLIENT_SECRET,
  quickbooksRedirectUri: process.env.QUICKBOOKS_REDIRECT_URI,
  quickbooksEnvironment: process.env.QUICKBOOKS_ENVIRONMENT,
  useSandbox: false,
  adminRights: {
    googleId: process.env.ADMIN_GOOGLE_ID,
    email: process.env.ADMIN_EMAIL
  },
  zscore: {
    type: process.env.ZSCORE_TYPE,
    ebitByTotalAssets: process.env.EBIT_BY_TOTAL_ASSETS,
    netSalesByTotalAssets: process.env.NET_SALES_BY_TOTAL_ASSETS,
    bookValueEquityByTotalLiabilities:
      process.env.BOOKVALUE_EQUITY_BY_TOTAL_LIABILITIES,
    workingCapitalByTotalAssets: process.env.WORKING_CAPITAL_BY_TOTAL_ASSETS,
    retainedEarningsByTotalAssets: process.env.RETAINED_EARNINGS_BY_TOTAL_ASSETS
  }
};
