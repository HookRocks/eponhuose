const express = require("express");
require("dotenv").config();
const app = express.Router()
const { getUserByEmail, userJoin} = require('../Modules/user')
const {visitEvent} = require("../Modules/event")


app.post("/join", async (req, res) => {
    
    const {Filter,userData}= JSON.parse(req.body)
    console.log(Filter)
    const output = await userJoin(Filter, userData);
    res.send(output)
})
app.post("/visit", async (req,res) => {
    await visitEvent(req,res);
    
})

module.exports = app