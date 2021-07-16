const mongoose=require('mongoose')
const Schema=mongoose.Schema

const commentSchema=new Schema({
    text:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:'Post'
    },
    likedBy:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]
},{timestamps:true})


const Comment=mongoose.model('Comment',commentSchema)
module.exports=Comment