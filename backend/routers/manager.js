const express=require("express");
require("dotenv").config();
const app=express.Router();const {getEventList} = require("../Modules/event")
const {compareIP,checkConnect}=require("../Modules/login.js")
app.use("/",(req,res,next)=>{
  console.log(req.url);
  if(req.url!="/login"&&!compareIP(req.ip)){return;}
  next();
})
app.post("/login",async(req,res)=>{

})

app.get("/listEvents",async (req,res)=>{
    res.send(await getEventList({}));
})


module.exports=app;