const mysql = require("mysql");
const util = require("util");
const fs = require("fs");
const config = require("./env.js");
// const path = require("path");
// const dotenv = require("dotenv");

// dotenv.config({
//   path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
// });

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASS,
      database: config.database,
      port: 3306,
      // ssl: { ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") },
    });
    this.pool.getConnection((err, connection) => {
      if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
          console.error("Database connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
          console.error("Database has too many connections.");
        }
        if (err.code === "ECONNREFUSED") {
          console.error("Database connection was refused.");
        }
      }
      if (connection) connection.release();
    });
    this.pool.query = util.promisify(this.pool.query);
  }

  async query(sql, params) {
    return await this.pool.query(sql, params);
  }

  // async query(sql, params, doErr, doSucc) {
  //   this.pool.query(sql, params, (err, result) => {
  //     if (!err) {
  //       doSucc(result);
  //     } else {
  //       doErr(err);
  //     }
  //   });
  // }
}

module.exports = new Database();
