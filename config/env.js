const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

// console.log(process.env.NODE_ENV);
// console.log(process.env.PORT);
// console.log(process.env.DB_HOST);
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5500,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "",
  database: process.env.database || "carleasing",
  AZURE_STORAGE_CONNECTION_STRING:
    process.env.AZURE_STORAGE_CONNECTION_STRING ||
    "DefaultEndpointsProtocol=https;AccountName=carleasing;AccountKey=EqpKjvElpsTWcu5F/W6GB8o4JR3Nxd0anXJf1UuCTA3m8hfA9S3E5DJEmHDMIm5Po4+xz0YkAAEl+AStdPhsOg==;EndpointSuffix=core.windows.net",
};
