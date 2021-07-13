const express=require('express')
const route=express.Router()
const userController=require('../controllers/user')
const {checkAuth}=require('../middlewares/checkAuth')

route.post('/sign-up',userController.signUp)
route.post('/sign-in',userController.signIn)
route.get('/profile-info',checkAuth,userController.profileInfo)
route.get('/others-profile/:userId',checkAuth,userController.othersProfile)
route.patch('/follow-unfollow/:followId',checkAuth,userController.followUnfollow)

module.exports=route