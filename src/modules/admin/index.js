const { Router } = require("express");
const AdminController = require("./admin.controller");
const { checkReadPermit } = require("../../utils/auth");
const adminRouter = Router();

adminRouter.get("/allClients", checkReadPermit, AdminController.getAllClients);
adminRouter.get("/singleClient", AdminController.getClientProfile);
adminRouter.put("/zscore", AdminController.updateZscore);
adminRouter.get("/zscore", AdminController.companyZscore);

module.exports = adminRouter;
