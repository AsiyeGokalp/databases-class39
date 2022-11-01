const mysql =  require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  user: "asiye",
  password: "sifremysql",
  database:"bank"
})

const createTables = [
  // create account table
  `CREATE TABLE IF NOT EXISTS account (
      account_number INT,
      balance INT,
      PRIMARY KEY (account_number));`,
  // create account_changes table  
  `CREATE TABLE IF NOT EXISTS account_changes (
      change_number INT AUTO_INCREMENT,
      account_number INT, 
      amount INT,
      changed_date DATETIME,
      remark VARCHAR(250),
      PRIMARY KEY (change_number),
      FOREIGN KEY (account_number) REFERENCES account(account_number) ON DELETE SET NULL);`,
]

con.connect(function (err) {
  if (err) throw err
  console.log("Connected!")
  con.query("CREATE DATABASE IF NOT EXISTS bank;", function (err, result) {
    // creating database bank
    if (err) throw err
    console.log("Database created")
  })
})

con.query("USE bank;", function (err, result) {
  // use database
  if (err) throw err
  console.log("Database : bank")
})

createTables.forEach((sql) => {
  con.query(sql, function (err, result) {
    // creating all tables from createTables array
    if (err) throw err
    console.log("Table created")
  })
})






 