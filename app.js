const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const app = express()
const jwt = require("jsonwebtoken")
const loginModel = require('./models/admin')
const missingModel = require('./models/missing')
const addModel = require('./models/add')
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

app.post("/adminSignIn",(req,res)=>{
    let input = req.body
    let result = loginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                    jwt.sign({email:input.username},"rescue-app",{expiresIn:"2d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status" : "token creation failed"})
                            } else {
                                res.json({"status" : "success","token":token})
                            }
                        })
                } else {
                    res.json({"status" : "incorect password"})
                }
            } else {
                res.json({"status" : "username doesnt exist"})
            }
        }
    )
})

app.post('/addMissingPeople',async(req,res)=>{
    let input = req.body
    let token = req.headers.token
    jwt.verify(token,"rescue-app",async(error,decoded)=>{
        if (decoded && decoded.email) {
            let result = new missingModel(input)
            await result.save()
            res.json({"status" : "success"})
        } else {
            res.json({"status" : "invalid authentication"})
        }
    })
    
})

app.post("/addpeople",(req,res)=>{
    let input = req.body
    let hashedPassword = bcrypt.hashSync(input.password,10)
    input.password=hashedPassword
    
    const dateobject = new Date()
    const currentyear = dateobject.getFullYear()
    //console.log(currentyear.toString())
    const currentmonth = dateobject.getMonth()+1
    //console.log(currentmonth.toString())
    const randomnumber = Math.floor(Math.random()*9999)+1000
    //console.log(randomnumber.toString())
    const people_id = "XYZ"+currentyear.toString()+currentmonth.toString()+randomnumber.toString()
    console.log(people_id)
    input.people_id=people_id
    console.log(input)
    let result = new addModel(input)
    result.save()
    res.json({"status":"success"})
})

app.listen(8080,()=>{
    console.log("server started...")
})      