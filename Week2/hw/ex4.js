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
//All research papers and the number of authors that wrote that paper
app.get('/papertitle',(req,res)=> {
  let sql = 'SELECT paper_title, COUNT(author_name) FROM research_Papers LEFT JOIN authors_research_Papers ON research_Papers.paper_id=authors_research_Papers.paper_id LEFT JOIN authors ON authors_research_Papers.author_id=authors.author_id GROUP BY paper_title'
  db.query(sql, (err,result) => {
    if(err) throw err
    console.log(result)
    res.send('research papers ...')

  })
})
//Sum of the research papers published by all female authors
app.get('/sumpapers',(req,res)=> {
  let sql = 'SELECT COUNT(paper_title) FROM research_Papers LEFT JOIN authors_research_Papers ON research_Papers.paper_id=authors_research_Papers.paper_id LEFT JOIN authors ON authors_research_Papers.author_id=authors.author_id WHERE authors.gender="F"'
  db.query(sql, (err,result) => {
    if(err) throw err
    console.log(result)
    res.send('Sum of the research papers...')

  })
})

//Average of the h-index of all authors per university
app.get('/average',(req,res)=> {
  let sql = 'SELECT AVG(h_index), university FROM authors GROUP BY university'
  db.query(sql, (err,result) => {
    if(err) throw err
    console.log(result)
    res.send('average...')

  })
})

//Sum of the research papers of the authors per university
app.get('/sumofres',(req,res)=> {
  let sql = 'SELECT COUNT(paper_title), university FROM research_Papers LEFT JOIN authors_research_Papers ON research_Papers.paper_id=authors_research_Papers.paper_id LEFT JOIN authors ON authors_research_Papers.author_id=authors.author_id GROUP BY university'
  db.query(sql, (err,result) => {
    if(err) throw err
    console.log(result)
    res.send('Sum of the research papers ...')

  })
})


//Minimum and maximum of the h-index of all authors per university
app.get('/maxmin',(req,res)=> {
  let sql = 'SELECT university,MIN(h_index), MAX(h_index) FROM authors group by university'
  db.query(sql, (err,result) => {
    if(err) throw err
    console.log(result)
    res.send('maxmin ...')

  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))