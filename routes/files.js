const router = require ('express').Router();
const multer = require('multer');
const path = require('path');
const File =require('../models/file');
const {v4 : uuidv4} =require('uuid')


 let storage = multer.diskStorage({
    destination:(req,file,cd) =>cd(null,'uploads/'),

 // fore unique file Name  
     filename:(req,file,cb)=>{
        const uniqueName =`${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName);
     }
  }) 

  let upload =multer({
   storage,
    limit:{fileSize:100000*100},
  }).single('myfiles');//100mb


router.post('/' ,(req,res)=>{
  //store files:
        upload(req,res,async(error)=>{
   //validate require
    //  if(!req.file){
    //    return res.json({error:'All files are required.'})
    //        }
            if (error){
             return res.status(500).send({error:error.message})
            }
  // store into Database:
        const file = new File({
         filename: req.file.filename,
         uuid: uuidv4(),
         path:req.file.path,
         size:req.file.size,
         
        });
        const response = await file.save();
        return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`});
        //http://localhost:3000/files/2433r4r4t444r3-3r3r
        });
   

    //Respone ->Link

})
 
// email setting

router.post('/send', async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;
  //Validate request
  if(!uuid || !emailTo || !emailFrom) {
      return res.status(422).send({ error: 'All fields are required except expiry.'});
  }
   // Get data from db 
//  try {
    const file = await File.findOne({ uuid: uuid });
    if(file.sender) {
      return res.status(422).send({ error: 'Email already sent once.'});
    }
    file.sender =  emailFrom;
    file.receiver = emailTo;
    const response = await file.save();
    // send mail
    const sendMail = require('../services/emailService');
    sendMail({
      from: emailFrom,
      to: emailTo,
      subject: 'inShare file sharing',
      text: `${emailFrom} shared a file with you.`,
      html: require('../services/emailTemplate')({
                emailFrom, 
                downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}?source=email` ,
                size: parseInt(file.size/1000) + ' KB',
                expires: '24 hours'
              }) 
            // }).then(() => {
            //   return res.json({success: true});
            // }).catch(err => {
            //   return res.status(500).json({error: 'Error in email sending.'});
            });
        // } catch(err) {
        //   return res.status(500).send({ error: 'Something went wrong.'});
        // }
        return res.send({success: true}); 
        });
        
        module.exports = router;