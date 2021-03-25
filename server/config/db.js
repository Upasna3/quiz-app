const mysql      = require('mysql');
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql2606",
  database: "quiz_app",
});

module.exports = db;