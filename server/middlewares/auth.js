const jwt =require('jwt-simple');
const User=require('../views/models/user');

const auth=async(req, res, next)=>{
    try{
        const token=req.headers.authorization
        const user=jwt.decode(token, 'mujhe kya pta');
        const userdata=await User.findOne({email:user.email});
        if(userdata){
            next();
        }else{
            res.redirect('http://localhost:3000/');
        }
    }catch(e){
        res.redirect('http://localhost:3000/');
    }
}

module.exports= auth