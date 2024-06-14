const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '42.113.122.118',
  user: 'vnfite',
  password: 'VnFIte!^2023',
  database: 'vnfite_after'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

module.exports = connection;