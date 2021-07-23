require("dotenv").config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
  development: {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "database.sqlite",
    "dialect": "sqlite",
  },
  test: {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "DB_HOST",
    "dialect": "mysql"
  },
  production: {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "DB_HOST",
    "dialect": "mysql"
  },
};
