const connectDB = require("../connect")
const user = require("../models/user")
require('dotenv').config()
const { addToEvent, getParticipants } = require("./event")





const getUserList = async (req, res) => {
    await connectDB(process.env.MONGO_URI)
    const userList = await getParticipants()
    return await user.find({ _id: { $in: userList } })
}

const getParticipantData = async (participantList) => {
    await connectDB(process.env.MONGO_URI);
    const userList = await user.find({ _id: { $in: participantList } })
    return userList
}


const getUserByEmail = async (userEmail) => {
    await connectDB(process.env.MONGO_URI)
    var foundUser = await user.findOne({ email: userEmail })
    return foundUser
}


const userJoin = async (Filter, userInfo) => {
    const { userName, userEmail} = {"userName":"test","userEmail":"test"}
    console.log(userInfo)
    var userData = await getUserByEmail(userEmail)
    if (!userData) {
        const newUser = new user({ name: userName, email: userEmail})
        await newUser.save();
        userData = newUser
    }
    console.log(userData)
    return await addToEvent(Filter, userData._id)
}
const joinProgram = async (req,res)=>{
    const {userName,userEmail,programName}= req.body;
    var userData=await getUserByEmail(userEmail);
    if(!userData){return res.status(404).send({success:false,msg:"no user with given email"})}
    await user.findOneAndUpdate({email:userEmail},{visitedEvent:programName});
}
module.exports = { getUserByEmail, userJoin, getUserList, getParticipantData }