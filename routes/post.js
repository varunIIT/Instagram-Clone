const express=require('express')
const route=express.Router()
const postController=require('../controllers/post')
const {checkAuth}=require('../middlewares/checkAuth')

route.post('/create',checkAuth,postController.create)
route.get('/all-post',checkAuth,postController.allPost)
route.get('/my-post',checkAuth,postController.myPost)
route.patch('/like-unlike/:id',checkAuth,postController.likeUnlike)
module.exports=route