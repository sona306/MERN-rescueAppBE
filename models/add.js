const mongoose = require("mongoose")
const addSchema = mongoose.Schema(
    {
        people_id:String,
        name:String,
        address:String,
        contact:String,
        email:String,
        password:String
    }
)

const addModel = mongoose.model("addpeople",addSchema)
module.exports=addModel