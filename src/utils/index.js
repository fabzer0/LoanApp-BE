const models = require("../database/models");
const {
  adminRights: { googleId, email },
  zscore: {
    type,
    ebitByTotalAssets,
    netSalesByTotalAssets,
    bookValueEquityByTotalLiabilities,
    workingCapitalByTotalAssets,
    retainedEarningsByTotalAssets
  }
} = require("../config/keys");

const { Employee, ZScore } = models;

async function setAdmin(googleId, email, publish, write, read) {
  await Employee.findOrCreate({
    where: { googleId },
    defaults: {
      googleId,
      email,
      publish,
      write,
      read
    }
  });
}

async function setZscore(
  type,
  ebitByTotalAssets,
  netSalesByTotalAssets,
  bookValueEquityByTotalLiabilities,
  workingCapitalByTotalAssets,
  retainedEarningsByTotalAssets
) {
  await ZScore.findOrCreate({
    where: { type },
    defaults: {
      type,
      ebitByTotalAssets,
      netSalesByTotalAssets,
      bookValueEquityByTotalLiabilities,
      workingCapitalByTotalAssets,
      retainedEarningsByTotalAssets
    }
  });
}

setAdmin(googleId, email, true, true, true);
setZscore(
  type,
  ebitByTotalAssets,
  netSalesByTotalAssets,
  bookValueEquityByTotalLiabilities,
  workingCapitalByTotalAssets,
  retainedEarningsByTotalAssets
);
