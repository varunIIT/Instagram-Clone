const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/Instagram-Clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
    console.log('db connection successful')
}).catch((err)=>{
    console.log('error connecting db')
})