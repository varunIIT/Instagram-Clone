const express=require('express')
const route=express.Router()
const commentController=require('../controllers/comment')
const {checkAuth}=require('../middlewares/checkAuth')

route.post('/create/:postId',checkAuth,commentController.create)
route.delete('/delete/:commentId',checkAuth,commentController.delete)
route.patch('/like-unlike/:commentId',checkAuth,commentController.likeUnlike)
module.exports=route