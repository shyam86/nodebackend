//contain user related routs

const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const pool = mysql.createPool({
    connectionLimit:10,
    host     : 'dbname',
    user     : 'nodetest',
    password : 'nodetest',
    database : 'nodetest'
})

function getConnection(){
    return pool
}


router.get('/messages',(req,res) =>{
    console.log("show messages.........")
    res.end()
})

router.get("/users", (req, res) => {
    console.log("********************Feteching user with id:"+ req.params.id)  
    const connection  = getConnection()
    const userId = req.params.id
    const queryString = "SELECT * FROM users"
    
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
         console.log("SQL ERR" +err)
         res.sendStatus(500)
         res.end()
         return    
        }

        const userws = rows.map((row)=>{
            return {firstName: row.firstname, lastName: row.lastname}
        })
        res.json(userws)
        console.log("Feteched users successfully")
    })
  //  res.send("Users: Shyam!")
})



router.post('/user_create', (req,res) =>{
    console.log("creating a new user..")
   const firstName= req.body.firstname
   const lastName= req.body.lastname
   const email= req.body.email
   const username= req.body.username
   const password= req.body.password
    const insertQuery = "INSERT INTO users(username , password, firstname, lastname, email) values (?,?,?,?,?)"
   getConnection().query(insertQuery, [username, password,firstName, lastName,email ], (err, results, fields) => {
        if(err){
            console.log("Failed to create new user" + err)
            res.sendStatus(500)
            return
        }
            console.log("Created new user with id:", results.insertedId);
            res.end()
   })
   
    res.end()
})



// to get result based on particular id
// here we are passing id as parameter at the end of url
router.get("/users/:id", (req, res) => {
    console.log("********************Feteching user with id:"+ req.params.id)  
    const connection  = getConnection()
    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE user_id =?"
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
         console.log("SQL ERR" +err)
         res.sendStatus(500)
         res.end()
         return    
        }

        const userws = rows.map((row)=>{
            return {firstName: row.firstname, lastName: row.lastname}
        })
        res.json(userws)
        console.log("Feteched users successfully")
    })
    
    //res.end()
    })

module.exports = router