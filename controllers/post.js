const Post=require('../models/post')
const Comment=require('../models/comment')
module.exports.create=async (req,res)=>{
    try{
        const {title,body,pic}=req.body
        if(!title||!body||!pic){//cannot create a post with empty title/body
            return res.status(422).json({error:'Title/Body/Pic can not be empty!'})
        }
        //creating a post
        const post=await Post.create({title,body,photo:pic,user:req.user._id})//we  get req.user from checkAuth middleware
        return res.status(201).json({success:'Post created successfully!'})
    }
    catch(err){
        console.log(err)
    }
}
module.exports.allPost=async (req,res)=>{
    try{
        const allPost =await Post.find({})
        .populate('user')
        .populate({path:'comments',populate:'user'})//get array of all posts with author(user) populated and comments populated
        res.status(200).json({allPost})

    }
    catch(err){
        console.log(err)
    }
}

module.exports.likeUnlike=async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        .populate('user')
        .populate({path:'comments',populate:'user'})//finding post on which like/unlike to be performed
        if(!post){
            return res.status(422).json({error:'No such post exists!'})
        }
        const {likedBy}=post//extracting likedBy array from post object 

        if(likedBy.includes(req.user._id)){//true if already liked i.e time to unlike it back
            likedBy.pull(req.user._id)
        }
        else{//time to like it
            likedBy.push(req.user._id)
        }
        await post.save()
        res.status(200).json(post)
    }
    catch(err){
        console.log(err)
    }
}
module.exports.delete=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.postId)
        //comparing both with type objectId will always return false,make atleast one with type String
        if(!post || post.user!=req.user.id){//authenticating user wheather user can delete post or not 
            return res.status(422).json({error:'cannot perform delete action!'})
        }
        
        await Comment.deleteMany({_id:{$in:post.comments}})//deleting comments associated to thid post
        await post.remove()//deleting this post
        res.status(200).json({success:'Post/associated comments deleted successfully!'})

    }
    catch(err){
        console.log(err)
    }
}