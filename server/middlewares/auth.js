const jwt =require('jwt-simple');
const User=require('../views/models/user');

const auth=async(req, res, next)=>{
    const token=req.headers.authorization
    const user=jwt.decode(token, 'mujhe kya pta');
    console.log(user)
    next();
}

module.exports= auth