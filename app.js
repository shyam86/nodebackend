const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
//body parser
const bodyParser =require('body-parser') 
app.use(express.static('./public'))
app.use(morgan('short'))


//helps to process the request from html form easier
app.use(bodyParser.urlencoded({extended:false}))

    
app.get("/", (req, res) => {
    console.log('Responding to root route')
    res.send("Hello world!")
})

//router
const router = require('./routes/user.js')
app.use(router)


//to listen on specific port
const port = process.env.PORT || 3002;

app.listen(port,() => {
console.log('server is up and listening on ...'+port)
})