const mongoose = require('mongoose')
const missingSchema = mongoose.Schema(
    {
        fullname:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        village:{
            type:String,
            required:true
        },
        place:{
            type:String,
            required:true
        },
        pincode:{
            type:String,
            required:true
        },
        housenumber:{
            type:String,
            required:true
        },
        missingdate:{
            type:String,
            required:true
        },
        aadharnumber:{
            type:String,
            required:true
        },
        gender:{
            type:String,
            required:true
        },
        age:{
            type:String,
            required:true
        }
    }
)

const missingModel = mongoose.model("missingpeople",missingSchema)
module.exports = missingModel