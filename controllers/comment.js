const Post = require("../models/post")
const Comment = require("../models/comment")

module.exports.create=async (req,res)=>{
    try{
        if(!req.body.text){
            return res.status(422).json({error:'Comment can not be empty!'})
        }
        let post=await Post.findById(req.params.postId)
        if(!post){
            return res.status(422).json({error:'No such post exists!'})
        }
        const comment=await Comment.create({
            text:req.body.text,
            user:req.user._id,
            post:req.params.postId
        })
        post.comments.push(comment._id)
        await post.save()
        post=await Post.findById(req.params.postId)
        .populate('user')
        .populate({path:'comments',populate:'user'})

        return res.status(201).json({post})

    }
    catch(err){
        console.log(err)
    }
}
module.exports.delete=async(req,res)=>{
    try{
        const comment=await Comment.findById(req.params.commentId)
        if(!comment){
            return res.status(422).json({error:'No such comment exists!'})
        }
        if(comment.user!=req.user.id){
            return res.status(422).json({error:'Not authorized!'})
        }
        const postId=comment.post
        const post=await Post.findById(postId)
        .populate('user')
        .populate({path:'comments',populate:'user'})

        post.comments.pull({_id:comment._id})//deleting commentId from commment array of corresponding post
        comment.remove()//deleting this comment from comment db
        await post.save()//saving this updated post
        res.status(200).json({post})
    }
    catch(err){
        console.log(err)
    }
}
module.exports.likeUnlike=async(req,res)=>{
    try{
        const comment=await Comment.findById(req.params.commentId)
        if(!comment){
            return res.status(422).json({error:'No such comment exists!'})
        }
        let isLiked='Unliked'
        if(comment.likedBy.includes(req.user._id)){
            comment.likedBy.pull(req.user._id)
        }
        else{
            comment.likedBy.push(req.user._id)
            isLiked='Liked'
        }
        await comment.save()
        const post=await Post.findById(comment.post)
        .populate('user')
        .populate({path:'comments',populate:'user'})
        res.status(200).json({post,isLiked})
    }
    catch(err){
         console.log(err)
    }
}