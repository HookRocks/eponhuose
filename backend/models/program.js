require('mongoose')

const programModel=new mongoose.Schema({
 name:{
    type:String,
    required:true
 },
 teachers:[
    {
        name:{
            type:String
        },
        email:{
            type:String
        }
    }
 ],
 times:{
    type:Array
 }
})


module.exports = mongoose.model("program", programModel);