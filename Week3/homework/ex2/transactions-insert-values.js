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

const insertTables = [
  // INSERT FOR  TABLE ACCOUNT 
  `INSERT INTO account (account_number, balance) VALUES (101, 10000);`,
  `INSERT INTO account (account_number, balance) VALUES (102, 7000);`,
  `INSERT INTO account (account_number, balance) VALUES (103, 5000);`,
  `INSERT INTO account (account_number, balance) VALUES (104, 13000);`,
 
  // INSERT FOR ACCOUNT CHANGES TABLE 
  `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (101, 1000, '2022-10-17 12:00:00','save money');`,
  `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (102, -200, '2022-10-17 13:00:00','rent car');`,
  `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (103, -100, '2022-10-17 12:30:00','shopping');`,
  `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (104, -100, '2022-10-17 10:00:00','fuel');`,
  
   ];


   insertTables.forEach((sql) => {
    con.query(sql, function (err, result) {
      // adding data coming from insertTables array
      if (err) throw err;
      console.log("Data added");
    });
  });

  