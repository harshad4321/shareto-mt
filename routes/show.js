const router = require ('express').Router();
const File = require('../models/file')



router.get( '/:uuid',async(req,res)=>{
    try{
        const file =await File.findOne({uuid:req.params.uuid});
        if(!file){
            return res.render('download',{error:'Link ha been expired.'})
        }
        return res.render('download',{
            uuid:file.uuid,
            fileName:file.fileName,
            fileSize: file.size,
        //Download link
            download:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`
         // Download link is attached in download button
        })
    }catch(error){
         return res.render('download',{error:'Something went Wrong.'})
    }
  

});

module.exports =router;