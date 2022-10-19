const express = require('express')
const mysql = require('mysql')

//create connection
const db = mysql.createConnection({
  host:'localhost',
  user :'asiye',
  password:'sifremysql',
  database:'meetup'
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
app.get('/createdb',(req,res) =>{
  let sql = 'CREATE DATABASE meetup'

  db.query(sql, (err, result)=>{
    if(err) throw err
    console.log(result)
    res.send('database created...')
  })
})

//create table invitee
app.get('/tableinvitee',(req, res) => {
  let sql='CREATE TABLE invitee(invitee_no int  AUTO_INCREMENT, invitee_name VARCHAR(40), invitee_by  VARCHAR(40), PRIMARY KEY(invitee_no))'
  db.query(sql, (err,result) => {
    if(err) throw err
    console.log(result)
    res.send('posts table created...')
    })
})


//insert 5 posts to invitee table
app.get('/addpostinvitee', (req, res)=>{
  let post = [
    ['person 1', 'person 2'],
    ['person 3', 'person 4'],
    ['person 5', 'person 6'],
    ['person 7', 'person 8'],
    ['person 9', 'person 10']
  ]
  let sql = 'INSERT INTO invitee( invitee_name, invitee_by) VALUES ?'
   db.query(sql, [post], (err, result) => {
    if(err) throw err
    console.log(result)
    res.send('post  added...')
  })
})

//create table room
app.get('/tableroom',(req, res) => {
  let sql='CREATE TABLE room(room_no int AUTO_INCREMENT, room_name VARCHAR(4), floor_number  VARCHAR(2), PRIMARY KEY(room_no))'
  db.query(sql, (err,result) => {
    if(err) throw err
    console.log(result)
    res.send('room table created...')
    })
})

//insert 5 posts to room table
app.get('/addpostroom', (req, res)=>{
  let post = [
    ['1014', '1'],
    ['2009', '2'],
    ['3021', '3'],
    ['3004', '3'],
    ['4005', '5']
  ]
  let sql = 'INSERT INTO room( room_name, floor_number) VALUES ?'
   db.query(sql, [post], (err, result) => {
    if(err) throw err
    console.log(result)
    res.send('post  added...')
  })
})


//create table meeting
app.get('/tablemeeting',(req, res) => {
  let sql='CREATE TABLE meeting(meeting_no int AUTO_INCREMENT, meeting_title VARCHAR(100), starting_time time, ending_time time,room_no int, PRIMARY KEY(meeting_no),FOREIGN KEY(room_no) REFERENCES room(room_no) ON DELETE SET NULL)'
  db.query(sql, (err,result) => {
    if(err) throw err
    console.log(result)
    res.send('meeting table created...')
    })
})

//insert 5 posts to meetiing table
app.get('/addpostmeeting', (req, res)=>{
  let post = [
    ['title1','10:30:00' ,'11:30:00', 1],
    ['title 2','12:00:00' ,'12:45:00', 2],
    ['title 3','13:15:00' ,'13:45:00', 3],
    ['title 4','14:15:00' ,'15:00:00', 4],
    ['title 5','15:30:00' ,'16:30:00', 5]
  ]
  let sql = 'INSERT INTO meeting( meeting_title VARCHAR(100), starting_time , ending_time time,room_no int) VALUES ?'
   db.query(sql, [post], (err, result) => {
    if(err) throw err
    console.log(result)
    res.send('post  added...')
  })
})

app.listen('3000',()=>{
  console.log('server started on port 3000')
})
