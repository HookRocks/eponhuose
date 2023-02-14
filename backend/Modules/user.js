const connectDB=require("../connect")
const user = require("../models/user")
require('dotenv').config()
const {addToEvent}=require("./event")

const getUserByEmail=async (userEmail)=>{
    await connectDB(process.env.MONGO_URI)
    var foundUser=await user.findOne({email:userEmail})
    return foundUser
}



const userJoin=async(userName,userEmail)=>{
    var userData=await getUserByEmail(userEmail)
    if(!userData){
        const newUser=new user({name:userName,email:userEmail})
        await newUser.save();
        userData=newUser
    }
    return await addToEvent(userData._Id)
    
}


module.exports={getUserByEmail,userJoin}