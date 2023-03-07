

var connectedIP=null;
var lastAction=0;


//used to confirm the current password
const checkPassword=(password)=>{
    return process.env.MANAGER_PASS==password;
}
const getIP=()=>{return connectedIP;}
const checkConnect=async(req)=>{if(checkPassword(req.body.password)){connectedIP=req.ip;lastAction=Date.now();}}
const compareIP=(ip)=>{
    if(ip!=getIP()){return false;}
    if(lastAction+3600000<Date.now()){connectedIP=null;return false;}else{lastAction=Date.now();}
    return true;
}




module.exports={checkPassword,checkConnect,getIP,compareIP}