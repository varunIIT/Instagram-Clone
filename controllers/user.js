const User=require('../models/user')
const bcrypt=require('bcrypt')
module.exports.signUp=async (req,res)=>{
    try{
        const {name,email,password}=req.body
        if(!name||!email||!password){
            return res.status(422).json({msg:'name/email/password can not be empty'})
        }
        else{
            const user= await User.findOne({email})
            if(user){
                return res.status(422).json({msg:'User already exists!'})
            }
            else{
                const user= await User.create({name,email,password})
                return res.status(201).json(user)
            }
        }
    }
    catch(err){
        console.log(err)
    }
}
module.exports.signIn=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email||!password){
          return  res.status(422).json({msg:'email/password can not be empty'})
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(422).json({msg:'Invalid email/password'})
        }
        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(err){
                console.log(err)
                return
            }
            if(isMatch){
                return res.status(200).json({msg:'sign-in successfull'})
            }
            return res.status(401).json({msg:'Invalid email/password'})
        })
    }
    catch(err){
        console.log(err)
    }
}