const mongoose=require('mongoose')
const Schema=mongoose.Schema

const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    followings:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    followers:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    profilePic:{
        type:String,
        default:'https://res.cloudinary.com/imageuploadtocloud/image/upload/v1626359776/images_tyiggw.jpg'
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpiry:{
        type:Number
    }
},{timestamps:true})
//storing the hashed password in db 
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

const User=mongoose.model('User',userSchema)
module.exports=User