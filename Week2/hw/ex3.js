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
//Write a query that prints names of all authors and their corresponding mentors
app.get('/authormentor',(req,res)=> {
  let sql = 'SELECT  authors.author_id AS 'Author ID', authors.author_name AS 'Author Name',mentors.author_name AS 'Mentor Name' FROM authors JOIN authors mentors ON authors.mentor = mentors.author_id;'
  db.query(sql, (err,result) => {
    if(err) throw err
    console.log(result)
    res.send('authors and their corresponding mentors...')

  })
})

//Write a query that prints all columns of authors and their published paper_title
app.get('/authorpapertitle',(req,res)=> {
  let sql = 'SELECT author_name, paper_title FROM authors LEFT JOIN authers_research_Papers LEFT JOIN research_Papers ON auther.auther_id = authers_research_Papers.auther_id ON research_Papers.paper_id = authers_research_Papers.paper_id'
  db.query(sql, (err,result) => {
    if(err) throw err
    console.log(result)
    res.send('authors and paper titles...')

  })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
