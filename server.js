const express=require('express')
const app=express()
const port=process.env.PORT||5000

require('dotenv').config()//to use environment variables

require('./config/db')//MongoDB connection
//body parsers
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',require('./routes/index'))//starting of all the routes 


app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`)
})