const express=require('express')
const route=express.Router()

route.use('/user',require('./user'))
route.use('/post',require('./post'))

module.exports=route