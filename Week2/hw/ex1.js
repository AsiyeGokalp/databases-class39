const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
  host:'localhost',
  user:'asiye',
  password:'sifremysql',
  database:'academie'
})

db.connect(err => {
  if(err){
    throw err
  }
  console.log('it is connected...')
})

const app = express()

//create database
app.get('/createdacademie',(req,res) =>{
  let sql = 'CREATE DATABASE academie'
  db.query(sql, (err,result) => {
    if(err) throw err
    console.log(result)
    res.send('database created')
  })
} )


//create authors table
app.get('/createdauthors', (req, res) => {
  let sql = 'CREATE TABLE authors(author_id INT AUTO_INCREMENT, author_name VARCHAR(100), university VARCHAR(100), date_of_birth DATE,h_index INT,gender VARCHAR(1), PRIMARY KEY(author_id))'
  db.query(sql, (err,result) => {
    if(err) throw err
    console.log(result)
    res.send('authors table created...')

  })
})

//add mentor column to table
app.get('/addmentor', (req,res) => {
  let sql = 'ALTER TABLE authors ADD mentor INT'
  db.query(sql,(err,result) =>{
    if(err) throw err
    console.log(result)
    res.send('mentor column added...')
  })
})

//make mentor a foreign key
app.get('/makementorforeignkey',(req,res) => {
  let sql = 'ALTER TABLE authors ADD FOREIGN KEY(mentor) REFERENCES authors(author_id) ON DELETE SET NULL'
  db.query(sql, (err, result) => {
    if(err) throw err
    console.log(result)
    res.send('mentor is made a foreign key...')
  })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
