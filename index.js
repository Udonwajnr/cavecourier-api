const express = require("express")
const dotenv = require("dotenv").config()
const app = express()
const colors = require("colors")
const port = process.env.PORT || 3000
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db")
let cors = require("cors")
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(port,()=>{
    console.log(`This api is about to Rock Hard`)
})

app.use("/api/user",require("./route/userAuthRoute"))
app.use("/api/category",require("./route/categoryRoute"))
app.use("/api/menu",require("./route/menuRoute"))
app.use("/api/eatery",require("./route/eateryRoute"))
app.use("/api/address",require("./route/addressRoute"))


connectDB()