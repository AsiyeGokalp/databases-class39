const mysql =  require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  user: "asiye",
  password: "sifremysql",
  database:"bank"
})

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
})
//transactions for 101 and 102
const createTransaction = [
  `START TRANSACTION`,
  `UPDATE account SET balance = balance - 1000 WHERE account_number = 101 `,
  `UPDATE account SET balance = balance + 1000 WHERE account_number = 102 `,
  `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (101, -1000, '2022-10-18 12:00:00','send');`,
  `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (102,  1000, '2022-10-18 12:00:00','received');`,
  `COMMIT`,
]

try{
  createTransaction.forEach((sql) => {
    con.query(sql, function (err, result) {
      // creating trancastion
      if (err) throw err
      console.log("Transactions happened")
    })
   
  })
}catch(err){
  con.query(`ROLLBACK`)
}