const mongoose=require('mongoose')

const userModel=new mongoose.Schema({
 name:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true
 },
 visitedEvent:{
   type:String,
   default:"UNDISCLOSED"
 }
})
module.exports = mongoose.model("users", userModel);