const express=require("express");
require("dotenv").config();
const app=express.Router()
const {getProgram}=require('../Modules/programs')



app.post("/show",async(req,res)=>{
    const {programName}=JSON.parse(req.body)
    const output=await getProgram(programName);
    res.send(output)
})


module.exports=app