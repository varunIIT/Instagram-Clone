const Post=require('../models/post')

module.exports.create=async (req,res)=>{
    try{
        const {title,body}=req.body
        if(!title||!body){//cannot create a post with empty title/body
            return res.status(422).json({msg:'title/body can not be empty'})
        }
        //creating a post
        const post=await Post.create({title,body,user:req.user._id})//we  get req.user from checkAuth middleware
        return res.status(201).json(post)
    }
    catch(err){
        console.log(err)
    }
}
module.exports.allPost=async (req,res)=>{
    try{
        const allPost =await Post.find({}).populate('user')//get array of all posts with author(user) populated
        res.status(200).json({allPost})

    }
    catch(err){
        console.log(err)
    }
}
module.exports.myPost=async (req,res)=>{
    try{
        const myPost=await Post.find({user:req.user._id})
        res.status(200).json({myPost})
    }
    catch(err){
        console.log(err)
    }
}