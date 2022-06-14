const router = require ('express').Router();
const multer = require('multer');
const path = require('path');
const File =require('../models/file');
const {v4 : uuid4} =require('uuid')


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
  }).single('myfiles');


router.post('/' ,(req,res)=>{
  //store files:
        upload(req,res,async(error)=>{
   //validate require
     if(!req.file){
       return res.json({error:'All files are required.'})
           }
            if (error){
             return res.status(500).send({error:error.message})
            }
  // store into Database:
        const file = new File({
         filename: req.file.filename,
         uuid:uuid4(),
         path:req.file.path,
         size:req.file.size,
         
        });
        const response = await file.save();
        return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`});
        //http://localhost:3000/files/2433r4r4t444r3-3r3r
        });
   

    //Respone ->Link

})

module.exports=router;

