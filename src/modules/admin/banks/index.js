const { Router } = require("express");
const BanksController = require("./banks.controller");

const bankRouter = Router();

bankRouter.post("/add_bank", BanksController.addBank);
bankRouter.put("/update_banklist", BanksController.updateBankList);
bankRouter.get("/get_banks", BanksController.getBanks);

module.exports = bankRouter;
