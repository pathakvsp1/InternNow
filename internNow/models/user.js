const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        default:"Private"

    },
    type:{
        type:String,
        default:"Student"
    },
    resetToken:String,
    expireToken:Date,
    pic:{
     type:String,
     default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tenforums.com%2Ftutorials%2F90186-change-default-account-picture-windows-10-a.html&psig=AOvVaw2e203UC-7r32IHDGEHwEY2&ust=1623698175153000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjOiJuplfECFQAAAAAdAAAAABAD"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

mongoose.model("User",userSchema)