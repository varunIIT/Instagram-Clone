const User=require('../models/user')
const Post=require('../models/post')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
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
        const myPost=await Post.find({user:req.user._id})//geting all post with created by this user
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
        const post=await Post.find({user:user._id})
        
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