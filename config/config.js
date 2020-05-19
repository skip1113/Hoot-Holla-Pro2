require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: "rootroot",
    database: "hoot_holla",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "rootroot",
    database: "hoot_holla",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    // eslint-disable-next-line camelcase
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
