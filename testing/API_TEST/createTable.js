var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Vineeth@2024",
  database: "vineethdb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE book (id INTEGER(10), name VARCHAR(20), price INTEGER(10), ram VARCHAR(10), storage VARCHAR(10))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});