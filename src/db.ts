const mysql = require("mysql");

export const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "nodejs_example",
});
