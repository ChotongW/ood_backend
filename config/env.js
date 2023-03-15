const dotenv = require("dotenv");
const path = require("path");

class Config {
  constructor() {
    dotenv.config({
      path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
    });
    this.NODE_ENV = process.env.NODE_ENV || "development";
    this.PORT = process.env.PORT || 5500;
    this.DB_HOST = process.env.DB_HOST || "localhost";
    this.DB_USER = process.env.DB_USER || "root";
    this.DB_PASS = process.env.DB_PASS || "";
    this.database = process.env.database || "carleasing";
    this.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    this.AZURE_STORAGE_CONNECTION_STRING =
      process.env.AZURE_STORAGE_CONNECTION_STRING ||
      "DefaultEndpointsProtocol=https;AccountName=carleasing;AccountKey=EqpKjvElpsTWcu5F/W6GB8o4JR3Nxd0anXJf1UuCTA3m8hfA9S3E5DJEmHDMIm5Po4+xz0YkAAEl+AStdPhsOg==;EndpointSuffix=core.windows.net";
  }
}

module.exports = new Config();
