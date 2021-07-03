const express=require('express')
const app=express()
const port=5000

require('./config/db')//MongoDB connection

app.use('/',require('./routes/index'))//starting of all the routes 

app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`)
})