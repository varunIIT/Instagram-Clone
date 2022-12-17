const User=require('../models/user')
const Post=require('../models/post')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const sendEmail=require('../utils/mailer')
module.exports.signUp=async (req,res)=>{
    try{
        const {name,email,password}=req.body
        if(!name||!email||!password){//checking if any feild is empty or not
            return res.status(422).json({error:'Name/Email/Password can not be empty!'})
        }
        else{
            const user= await User.findOne({email})//checking if there is already an account with this email
            if(user){
                return res.status(422).json({error:'User already exists!'})
            }
            else{//ready to create new user in db i.e successful sign up
                const user= await User.create({name,email,password})
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: 'Instagram-Sucessful Sign Up!',
                    html: `<h3>Welcome ${user.name} to Instagram!</h3>`
                  };
                sendEmail(mailOptions)
                return res.status(201).json({success:'Signed up successfully!'})
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
          return  res.status(422).json({error:'Email/Password can not be empty!'})
        }
        const user=await User.findOne({email})//geting user with given email
        if(!user){//if no user with this email exits
            return res.status(422).json({error:'Invalid Email/Password!'})
        }
        //if user is found and last thing is left to validate his password with given password
        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(err){//internal server error
                console.log(err)
                return
            }
            if(isMatch){//if passowrd is matched i.e successfull login
                const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
                const {_id,name,email,profilePic}=user
                return res.status(200).json({token,_id,name,email,profilePic})
            }
            return res.status(422).json({error:'Invalid Email/Password!'})//is passowrd is inncorrect
        })
    }
    catch(err){
        console.log(err)
    }
}
//geting user's profile information
module.exports.profileInfo=async (req,res)=>{
    try{
        const myPost=await Post.find({user:req.user._id}).sort('-createdAt')//geting all post with created by this user
        const user=await User.findById(req.user._id)
        res.status(200).json({myPost,user})
    }
    catch(err){
        console.log(err)
    }
}
module.exports.othersProfile=async (req,res)=>{
    try{
        const user=await User.findById(req.params.userId)
        if(!user){
            return res.status(422).json({error:'No such user exists!'})
        }
        const post=await Post.find({user:user._id}).sort('-createdAt')
        
        return res.status(200).json({user,post})
    }
    catch(err){
        console.log(err)
    }
}
//follow/unfollow a user
module.exports.followUnfollow=async (req,res)=>{
    try{
        const loggedInUser=await User.findById(req.user._id)
        const otherUser=await User.findById(req.params.followId)
        if(!otherUser){
            return res.status(422).json({error:'No such user exists!'})
        }
        let isFollowing=loggedInUser.followings.includes(req.params.followId)
        //if loggedInUser is already following otherUser ,then make in unfollow
        if(isFollowing){
            loggedInUser.followings.pull(req.params.followId)//removing otherUser form following list of loggedInUser
            otherUser.followers.pull(req.user._id)//removing LoggedInUser form followers list of otherUser
            
        }
        else{
            loggedInUser.followings.push(req.params.followId)//adding otherUser form following list of loggedInUser
            otherUser.followers.push(req.user._id)//adding LoggedInUser form followers list of otherUser
        }
        await loggedInUser.save()
        await otherUser.save()
        res.status(200).json({otherUser})

    }
    catch(err){
        console.log(err)
    }
}
//updating user profileImage
module.exports.updateProfilePic=async(req,res)=>{
    try{
        let user
        if(req.body.url){
             user=await User.findByIdAndUpdate(req.user.id,{profilePic:req.body.url},{new:true})//updating profile pic url of this user in db
        }
        else{
             user=await User.findByIdAndUpdate(req.user.id,{profilePic:'https://res.cloudinary.com/imageuploadtocloud/image/upload/v1626359776/images_tyiggw.jpg'},{new:true})
        }
        res.status(200).json({user})
    }
    catch(err){
        console.log(err)
    }
}
module.exports.resetPassword=async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){//checking if user's email is signed up or not
            return res.status(422).json({error:'No such email exists!'})
        }
        //generate random token for this user
        const crypto = require("crypto");
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken=token
        //setting expiry date for current reset password session which is of 5 minutes form now
        user.resetPasswordExpiry=Date.now()+300000
        await user.save()
        //Now send mail to this user
        var mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: 'Instagram-Reset Password ',
            html: `<h3>Please click <a href="${process.env.REDIRECT}${token}">here</a> to reset your passowrd.</h3>`
          };
        sendEmail(mailOptions)
        res.status(200).json({success:'Please check your mail!'})
    }
    catch(err){
        console.log(errr)
    }
}
//changing user's password
module.exports.newPassword=async (req,res)=>{
    try{
        const user=await User.findOne({resetPasswordToken:req.body.token})
        if(!user){
            return res.status(422).json({error:'Invalid Request!'})
        }
        if(user.resetPasswordExpiry-Date.now()<0){
            return res.status(422).json({error:'Session expired, Please try again!'})
        }
        user.password=req.body.password//changing password
        //making reset password token and expiry null
        user.resetPasswordToken=null
        user.resetPasswordExpiry=null
        await user.save()
        return res.status(200).json({success:'Your password has been changed!'})
    }
    catch(err){
        console.log(err)
    }
}
//search user 
module.exports.search=async(req,res)=>{
    try{
        let pattern=new RegExp('^'+req.body.query)
        console.log(pattern)
        const user=await User.find({email:{$regex:pattern}})
        res.status(200).json({user})
    }
    catch(err){
        console.log(err)
    }
}

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

module.exports.googleAuth=async (req,res)=>{
    try{
        const googleToken=req.body.token
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.CLIENT_ID
        });
        const {email,name } = ticket.getPayload();
        const password=email+googleToken
        let user=await User.findOne({email})
        
        if(!user){//sign up
            user=await User.create({email,password,name})
            var mailOptions = {
                from: process.env.EMAIL,
                to: user.email,
                subject: 'Instagram-Sucessful Sign Up!',
                html: `<h3>Welcome ${user.name} to Instagram!</h3>`
              };
            sendEmail(mailOptions)    
        }
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
        const {_id,profilePic}=user
        return res.status(200).json({token,_id,name:user.name,email,profilePic})

    }
    catch(err){
        console.log(err)
    }
}