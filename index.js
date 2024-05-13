const express = require("express")
const dotenv = require("dotenv").config()
const app = express()
const port = process.env.PORT || 3000
const cookieParser = require("cookie-parser")

let cors = require("cors")
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(port,()=>{
    console.log(`This api is about to Rock Hard`)
})
