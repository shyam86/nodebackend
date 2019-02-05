const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('combined'))


app.get("/users/:id", (req, res) => {
    console.log("********************Feteching user with id:"+ req.params.id)  
    
    const connection  = mysql.createConnection({
        
    })

    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE user_id =?"
    
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
         console.log("SQL ERR" +err)
         res.sendStatus(500)
         res.end()
         return    
        }
        res.json(rows)
        console.log("Feteched users successfully")
    })
    
    //res.end()
    })

    
app.get("/", (req, res) => {
    console.log('Responding to root route')
    res.send("Hello world!")
})

app.get("/users", (req, res) => {
    const user1= {firstName:  "Shyam", lastName: "Kumar"}
    const user2= {firstName:  "Kar", lastName: "Thik"}
    
    res.json([user1,user2])
  //  res.send("Users: Shyam!")
})




app.listen(3002,() => {
console.log('server is up and listening on 3002...')
})