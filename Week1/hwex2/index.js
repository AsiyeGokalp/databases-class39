const express = require('express')
const mysql = require('mysql')

//create connection
const db = mysql.createConnection({
  host:'localhost',
  user :'asiye',
  password:'sifremysql',
  database:'world'
})

//connect 
db.connect((err)=>{
  if(err){
    throw err
  }
  console.log('it is connected')
})

const app = express()

//create db
app.get('/createdbworld',(req,res) =>{
  let sql = 'CREATE DATABASE world'

  db.query(sql, (err, result)=>{
    if(err) throw err
    console.log(result)
    res.send('database created...')
   })
})

//the names of countries with population greater than 8 million
app.get('/populationmore',(req,res) => {
  let sql ='SELECT name FROM country WHERE population > 8000000'
  db.query(sql, (err,result) => {
 if(err) throw err
  res.send(result)
  })
})

//the names of countries that have “land” in their names
app.get('/landname',(req,res) => {
  let sql =`SELECT name FROM country WHERE name like "%land%"`
  db.query(sql, (err,result) => {
 if(err) throw err
  res.send(result)
  })
})

//the names of the cities with population in between 500,000 and 1 million
app.get('/populationbetween',(req,res) => {
  let sql ='SELECT name FROM country WHERE population between 500000 and 1000000'
  db.query(sql, (err,result) => {
 if(err) throw err
  res.send(result)
  })
})

//the name of all the countries on the continent ‘Europe’
app.get('/continenteurope',(req,res) => {
  let sql ='SELECT name FROM country WHERE continent = "Europe"'
  db.query(sql, (err,result) => {
 if(err) throw err
  res.send(result)
  })
})

// the countries in the descending order of their surface areas
app.get('/descsurface',(req,res) => {
  let sql ='SELECT name, surfacearea FROM country ORDER BY surfacearea DESC'
  db.query(sql, (err,result) => {
 if(err) throw err
  res.send(result)
  })
})

//the names of all the cities in the Netherlands
app.get('/citynld',(req,res) => {
  let sql ='SELECT name FROM city WHERE countrycode="NLD"'
  db.query(sql, (err,result) => {
 if(err) throw err
  res.send(result)
  })
})

//the population of Rotterdam
app.get('/populationrotterdam',(req,res) => {
  let sql ='SELECT population FROM city WHERE name="Rotterdam"'
  db.query(sql, (err,result) => {
 if(err) throw err
  res.send(result)
  })
})

//the top 10 countries by Surface Area
app.get('/topsurface',(req,res) => {
  let sql ='SELECT name, surfacearea FROM country ORDER BY surfacearea DESC LIMIT 10'
  db.query(sql, (err,result) => {
 if(err) throw err
  res.send(result)
  })
})

// the top 10 most populated cities
app.get('/toppopulated',(req,res) => {
  let sql ='SELECT name, population FROM city ORDER BY population DESC LIMIT 10'
  db.query(sql, (err,result) => {
 if(err) throw err
  res.send(result)
  })
})

//the population number of the world
app.get('/populationworld',(req,res) => {
  let sql ='SELECT SUM(population) FROM country'
  db.query(sql, (err,result) => {
 if(err) throw err
  res.send(result)
  })
})


app.listen('3000',()=>{
  console.log('server started on port 3000')
})
