const connectDB=require("../connect")
require('dotenv').config()
const program=require('../models/program')

const getProgram=async(programName)=>{
    await connectDB(process.env.MONGO_URI);
    return await program.findOne({name:programName})
}

module.exports={getProgram}
