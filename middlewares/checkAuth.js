const jwt=require('jsonwebtoken')
const User=require('../models/user')
module.exports.checkAuth=async (req,res,next)=>{
    try{
        const {authorization}=req.headers //authorization->'Bearer <token_value>'
        if(!authorization){//if authorization key is not set
            return res.status(401).json({msg:'you must be logged in'})
        }
        const token=authorization.split(' ')[1]//Extracting <token_value> from 'Bearer <token_value>'
        jwt.verify(token,process.env.JWT_SECRET,async (err,payload)=>{
            if(err){//if token is tampered/invalid
                return res.status(401).json({msg:'you must be logged in'})
            }
            //if token is valid and now user is authenticated/logined
            const {_id}=payload
            const user=await User.findById(_id)
            req.user=user
            next()
        })
       

    }
    catch(err){
    }
}