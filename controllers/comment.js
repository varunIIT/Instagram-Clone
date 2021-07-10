const Post = require("../models/post")
const Comment = require("../models/comment")

module.exports.create=async (req,res)=>{
    try{
        if(!req.body.text){
            return res.status(422).json({error:'Comment can not be empty!'})
        }
        const post=await Post.findById(req.params.postId)
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
        return res.status(201).json({success:'Commented Successfully!'})

    }
    catch(err){
        console.log(err)
    }
}