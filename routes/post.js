const express=require('express')
const route=express.Router()
const postController=require('../controllers/post')
const {checkAuth}=require('../middlewares/checkAuth')

route.post('/create',checkAuth,postController.create)
route.get('/all-post',postController.allPost)
route.get('/my-post',checkAuth,postController.myPost)
module.exports=route