const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
module.exports.signUp=async (req,res)=>{
    try{
        const {name,email,password}=req.body
        if(!name||!email||!password){//checking if any feild is empty or not
            return res.status(422).json({msg:'name/email/password can not be empty'})
        }
        else{
            const user= await User.findOne({email})//checking if there is already an account with this email
            if(user){
                return res.status(422).json({msg:'User already exists!'})
            }
            else{//ready to create new user in db i.e successful sign up
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
        if(!email||!password){//checking if any feild is empty or not
          return  res.status(422).json({msg:'email/password can not be empty'})
        }
        const user=await User.findOne({email})//geting user with given email
        if(!user){//if no user with this email exits
            return res.status(422).json({msg:'Invalid email/password'})
        }
        //if user is found and last thing is left to validate his password with given password
        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(err){//internal server error
                console.log(err)
                return
            }
            if(isMatch){//if passowrd is matched i.e successfull login
                const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
                return res.status(200).json({token})
            }
            return res.status(401).json({msg:'Invalid email/password'})//is passowrd is inncorrect
        })
    }
    catch(err){
        console.log(err)
    }
}