var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

const sendEmail=(targetEmail,token)=>{
    var mailOptions = {
        from: process.env.EMAIL,
        to: targetEmail,
        subject: 'Instagram Reset Password ',
        html: `<h3>Please click <a href="${process.env.REDIRECT}${token}">here</a> to reset your passowrd.</h3>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
module.exports=sendEmail