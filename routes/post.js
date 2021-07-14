const express=require('express')
const route=express.Router()
const postController=require('../controllers/post')
const {checkAuth}=require('../middlewares/checkAuth')

route.post('/create',checkAuth,postController.create)
route.get('/all-post',checkAuth,postController.allPost)
route.patch('/like-unlike/:id',checkAuth,postController.likeUnlike)
route.delete('/delete/:postId',checkAuth,postController.delete)
route.get('/myFollowingsPosts',checkAuth,postController.myFollowings)
module.exports=route