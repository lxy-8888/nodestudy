var express =require('express');
var router=express.Router();
const {uploadFiles}=require('../utils/handleFiles.js');

router.post('/upload',function(req,res,next){
    //做图片上传的相关配置
    const upload=uploadFiles();
    upload(req,res,(err)=>{
        if(err){
            console.log("图片上传失败",err);
        }else{
            console.log('图片上传成功',req.files);
            res.send({
                msg:'图片上传成功',
                success:true,
                filename:req.files.map(item=>item.filename)
            })
        }
    });
});

module.exports=router;