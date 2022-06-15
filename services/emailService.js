const nodemailer = require('nodemailer')
module.exports = async({from, to, subject, text, html})=>{
   let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port:process.env.SMTP_PORT,
      secure:false,
      auth:{
        user: process.env.MAILS_USER,  
        pass: process.env.MAILS_PASS,
      }
   });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `Shareto <${from}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
});
  console.log(info);
}