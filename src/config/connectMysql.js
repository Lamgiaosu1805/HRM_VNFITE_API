const mysql = require('mysql2');

const connection = mysql.createConnection({

});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

module.exports = connection;