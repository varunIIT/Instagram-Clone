const mongoose=require('mongoose')
const Schema=mongoose.Schema

const postSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    likedBy:[{type:Schema.Types.ObjectId,ref:'User'}],
    comments:[{type:Schema.Types.ObjectId,ref:'Comment'}
]
})


const Post=mongoose.model('Post',postSchema)
module.exports=Post