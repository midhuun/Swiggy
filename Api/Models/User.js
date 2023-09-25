const mongoose = require('mongoose');


const UserSchema =new mongoose.Schema({
    name:{
    type:String,
    unique:true
    },
    email:String,
    password:String,
    phone:{
        type:String,
        unique:true
    },
    carItems:[
       { id:Number,
        count:Number,
       }
    ]
        
    
    
})
const UserModel = mongoose.model("User",UserSchema);
module.exports =UserModel;