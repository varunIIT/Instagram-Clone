const express=require('express')
const route=express.Router()
const commentController=require('../controllers/comment')
const {checkAuth}=require('../middlewares/checkAuth')

route.post('/create/:postId',checkAuth,commentController.create)

module.exports=route