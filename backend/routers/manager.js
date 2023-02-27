const express=require("express");
require("dotenv").config();
const app=express.Router();const {getEventList} = require("../Modules/event")
app.get("/", (req, res) => {
    var dirname=__dirname.split("\\")
    dirname.pop();dirname=dirname.join("/");
    res.status(202).sendFile(dirname+"/appmanager/index.html")
  })


app.get("/listEvents",async (req,res)=>{
    res.send(await getEventList({}));
})


module.exports=app;