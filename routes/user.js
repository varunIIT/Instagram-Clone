const express=require('express')
const route=express.Router()
const userController=require('../controllers/user')
const {checkAuth}=require('../middlewares/checkAuth')

route.post('/sign-up',userController.signUp)
route.post('/sign-in',userController.signIn)
route.get('/profile-info',checkAuth,userController.profileInfo)
route.get('/others-profile/:userId',checkAuth,userController.othersProfile)
route.patch('/follow-unfollow/:followId',checkAuth,userController.followUnfollow)
route.patch('/update-profile-pic',checkAuth,userController.updateProfilePic)
route.post('/reset-password',userController.resetPassword)
module.exports=route