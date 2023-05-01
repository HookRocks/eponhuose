const express = require("express");
require("dotenv").config();
const app = express.Router()
const { getUserByEmail, userJoin } = require('../Modules/user')



app.post("/join", async (req, res) => {
    const { Filter, userData } = JSON.parse(req.body)
    const output = await userJoin(Filter, userData);
    res.send(output)
})


module.exports = app