const express=require('express')
const route=express.Router()
const userController=require('../controllers/user')
const {checkAuth}=require('../middlewares/checkAuth')

route.post('/sign-up',userController.signUp)
route.post('/sign-in',userController.signIn)
route.get('/profile/:userId',checkAuth,userController.profile)
module.exports=route