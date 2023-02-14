const express=require("express");
require("dotenv").config();
const app=express.Router()
const {getUserByEmail,userJoin}=require('../Modules/user')



app.post("/join",async(req,res)=>{
    const {userEmail,userName}=JSON.parse(req.body)
    const output=await userJoin(userName,userEmail);
    res.send(output)
})