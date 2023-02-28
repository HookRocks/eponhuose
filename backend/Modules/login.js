


//used to confirm the current password
const checkPassword=(password)=>{
    return password==process.env.MANAGER_PASS
}




module.exports={checkPassword}