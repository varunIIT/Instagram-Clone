const express=require('express')
const route=express.Router()
const user=require('../controllers/user')

route.post('/sign-up',user.signUp)
route.post('/sign-in',user.signIn)

module.exports=route