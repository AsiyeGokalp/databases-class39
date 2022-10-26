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

//create authors table
app.get('/createdresearch', (req, res) => {
  let sql = 'CREATE TABLE research_Papers(paper_id INT AUTO_INCREMENT, paper_title VARCHAR(100), conference VARCHAR(100), publish_date DATE, PRIMARY KEY(paper_id))'
  db.query(sql, (err,result) => {
    if(err) throw err
    console.log(result)
    res.send('research paper table created...')

  })
})


app.get('/createdauthorpaper', (req, res) => {
  let sql = 'CREATE TABLE authors_research_Papers(author_id INT, paper_id INT, FOREIGN KEY(author_id) REFERENCES authors(author_id) ON DELETE SET NULL, FOREIGN KEY(paper_id) REFERENCES research_Papers(paper_id) ON DELETE SET NULL'
  db.query(sql, (err,result) => {
    if(err) throw err
    console.log(result)
    res.send('authors research papers table created...')

  })
})

app.get('/addauthors',(req,res) => {
  let post = [
    ["name 1","university 1", "1972-12-12",20,"F",2],
    ["name 2","university 2", "1974-03-12",15,"F",3],
    ["name 3","university 3", "1980-02-03",12,"M",2],
    ["name 4","university 4", "1967-09-04",25,"F",5],
    ["name 5","university 5", "1973-11-11",17,"M",2],
    ["name 6","university 6", "1984-01-10",12,"M",3],
    ["name 7","university 7", "1990-02-02",9,"M",5],
    ["name 8","university 8", "1988-05-05",11,"F",2],
    ["name 9","university 9", "1973-01-09",16,"F",2],
    ["name 10","university 10", "1972-08-10",17,"F",5],
    ["name 11","university 11", "1979-12-12",13,"M",3],
    ["name 12","university 12", "1985-11-02",7,"F",3],
    ["name 13","university 13", "1991-05-06",23,"F",5],
    ["name 14","university 14", "1989-10-12",8,"F",2],
    ["name 15","university 15", "1993-01-01",4,"M",2]
  ]
  let sql = 'INSERT INTO authors(author_name, university, date_of_birth, h_index, gender, mentor) VALUES ?'
  db.query(sql, [post], (err, result) => {
    if(err) throw err
    console.log(result)
    res.send('post  added...')
  })
})

app.get('/addapaper',(req,res) => {
  let post = [
    ["paper 1","conference 1", "2022-12-12"],
    ["paper 2","conference 2", "2022-03-12"],
    ["paper 3","conference 3", "2022-02-03"],
    ["paper 4","conference 4", "2022-09-04"],
    ["paper 5","conference 5", "2022-11-11"],
    ["paper 6","conference 6", "2022-01-10"],
    ["paper 7","conference 7", "2022-02-02"],
    ["paper 8","conference 8", "2022-05-05"],
    ["paper 9","conference 9", "2022-01-09"],
    ["paper 10","conference 10", "2022-08-10"],
    ["paper 11","conference 11", "2022-12-12"],
    ["paper 12","conference 12", "2022-11-02"],
    ["paper 13","conference 13", "2022-05-06"],
    ["paper 14","conference 14", "2022-10-12"],
    ["paper 15","conference 15", "2022-01-01"],
    ["paper 16","conference 16", "2022-12-12"],
    ["paper 17","conference 17", "2022-03-12"],
    ["paper 18","conference 18", "2022-02-03"],
    ["paper 19","conference 19", "2022-09-04"],
    ["paper 20","conference 20", "2022-11-11"],
    ["paper 21","conference 21", "2022-01-10"],
    ["paper 22","conference 22", "2022-02-02"],
    ["paper 23","conference 23", "2022-05-05"],
    ["paper 24","conference 24", "2022-01-09"],
    ["paper 25","conference 25", "2022-08-10"],
    ["paper 26","conference 26", "2022-12-12"],
    ["paper 27","conference 27", "2022-11-02"],
    ["paper 28","conference 28", "2022-05-06"],
    ["paper 29","conference 29", "2022-10-12"],
    ["paper 30","conference 30", "2022-01-01"]
  ]
  let sql = 'INSERT INTO research_Papers(paper_title, conference, publish_date) VALUES ?'
  db.query(sql, [post], (err, result) => {
    if(err) throw err
    console.log(result)
    res.send('post  added...')
  })
})

app.get('/addauthorpaper',(req,res) => {
  let post = [
    [1,1],
    [1,2],
    [1,3],
    [2,4],
    [2,5],
    [2,6],
    [4,7],
    [5,8],
    [5,9],
    [5,1],
    [6,11],
    [7,12],
    [8,13],
    [8,14],
    [8,15],
    [8,16],
    [8,17],
    [8,18],
    [9,19],
    [10,20],
    [11,21],
    [11,22],
    [11,23],
    [12,24],
    [12,25],
    [12,26],
    [15,27],
    [15,28],
    [15,29],
    [15,30]
   
    
  ]
  let sql = 'INSERT INTO authors_research_Papers(author_id, paper_id) VALUES ?'
  db.query(sql, [post], (err, result) => {
    if(err) throw err
    console.log(result)
    res.send('post 3  added...')
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
