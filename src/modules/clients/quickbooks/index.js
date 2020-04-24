const { Router } = require("express");
const QuickBooksController = require("./controller");

const quickBooksRouter = Router();

quickBooksRouter.get(
  "/integrate_quickbooks",
  QuickBooksController.integrateQuickBooks
);
quickBooksRouter.get(
  "/retrieveAccessToken",
  QuickBooksController.retrieveAccessToken
);
quickBooksRouter.get(
  "/retrieve_company_info",
  QuickBooksController.getInformation
);

module.exports = quickBooksRouter;
