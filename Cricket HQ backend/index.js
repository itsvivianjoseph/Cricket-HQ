const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")

app.get("/",(req,res)=> {
    res.send("Hello world!")
})

//middlewares
app.use(express.json())
app.use(cors())

//routes
const connection = require("./DB.js")

//DB - connection
connection()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`your listening on PORT ${PORT}`) })