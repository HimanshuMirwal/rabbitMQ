const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    email:{
        type:String
    },
    subject:{
        type:String
    },
    description:{
        type:String
    },
    response:{
        type:String
    }
})
const modelEmailUSer = mongoose.model("emaiUser",schema);
module.exports = modelEmailUSer;