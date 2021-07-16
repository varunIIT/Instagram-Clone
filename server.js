const express=require('express')
const app=express()
const port=process.env.PORT||5000

require('dotenv').config()//to use environment variables

require('./config/db')//MongoDB connection
//body parsers
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',require('./routes/index'))//starting of all the routes 

//serving static frontend files from reactJs
if(process.env.NODE_ENV=='production'){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`)
})