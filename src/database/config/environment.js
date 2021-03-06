require("dotenv").config();

const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT,
  NODE_ENV: process.env.NODE_ENV || "production"
};

module.exports = env;