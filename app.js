const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Mysql Connection
const pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'studentdb'
});

app.post('/register',(req,res) => {

    pool.getConnection((err, connection)=>{
        if(err)throw err
        console.log('connected as id '+ connection.threadId)
        
        const params = req.body

        connection.query('INSERT INTO students SET ?',params, (err,rows)=>{
            connection.release() //return the connection to pool

            if(!err){
                res.send(params.fname +' Has been added')
            }
            else{
                console.log(err)
            }
        })
        console.log(req.body)
    })
})

app.get('/students',(req,res) => {

    pool.getConnection((err, connection)=>{
        if(err)throw err
        console.log('connected as id '+ connection.threadId)

        connection.query('SELECT * from students', (err,rows)=>{
            connection.release() //return the connection to pool

            if(!err){
                res.send(rows)
            }
            else{
                console.log(err)
            }
        })
    })
})

app.delete('/:studentno',(req,res) => {

    pool.getConnection((err, connection)=>{
        if(err)throw err
        console.log('connected as id '+ connection.threadId)

        connection.query('DELETE from students WHERE studentno = ?',[req.params.studentno], (err,rows)=>{
            connection.release() //return the connection to pool

            if(!err){
                res.send([req.params.studentno] +' Has been deleted')
            }
            else{
                console.log(err)
            }
        })
    })
})

//must be changed
app.put('/',(req,res) => {

    pool.getConnection((err, connection)=>{
        if(err)throw err
        console.log('connected as id '+ connection.threadId)
        
        const {id, fname, lname, studentno,subject,username,password } = req.body

        connection.query('UPDATE students SET fname  = ? WHERE id = ?',[Title,Id], (err,rows)=>{
            connection.release() //return the connection to pool

            if(!err){
                res.send(Title +' Has been updated')
            }
            else{
                console.log(err)
            }
        })
        console.log(req.body)
    })
})

app.listen(port, ()=> console.log('Listening on Port '+ port))