const mysql =  require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  user: "asiye",
  password: "sifremysql",
  database:"world"
})

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
})
//fetch all the records in the database
const sql = `SELECT * FROM Country WHERE name='fhsjh OR 1=1' AND code ='222 OR 1=1' `
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Data added");
});

//it is no longer vulnerable to SQL injection
function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = ? and code = ?`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}