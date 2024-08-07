const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const app = express()
const loginModel = require('./models/admin')
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://sonasabu:sonavi306@cluster0.ejzjjq6.mongodb.net/mernrescueappdb?retryWrites=true&w=majority&appName=Cluster0")

app.post("/adminSignUp",(req,res)=>{
    let input = req.body
    let hashedPassword = bcrypt.hashSync(input.password,10)
    input.password=hashedPassword
    console.log(input)
    let result = new loginModel(input)
    result.save()
    res.json({"status" : "success"})
})

app.listen(8080,()=>{
    console.log("server started..")
})