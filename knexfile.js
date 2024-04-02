require("dotenv").config();
module.exports = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./database/migrations",
    tableName: "migrations",
  },
  seeds: {
    directory: "./database/seeds",
  },
};
