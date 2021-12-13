const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_URI||'mongodb://localhost/Instagram-Clone-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
    console.log('db connection successful')
}).catch((err)=>{
    console.log('error connecting db')
})