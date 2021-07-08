var express = require('express');
var router = express.Router();
const{getstudents, deletestudens,addstudents,upgetstudents,upconfirm} = require('../service/studentsService.js');
const { moveFiles, removeFiles } = require('../utils/handleFiles.js');

//获取所有学生
router.get('/getstudents', async function(req, res, next) {
  const {type, value,pagesize, dangqianye}= req.query;
  res.send(await getstudents({type, value,pagesize,dangqianye}));
});

//删除学生
router.post('/deleteStudentsById',async function(req, res){
  console.log('nadaoxuesheng',req.body)
  const {_id} = req.body;
   res.send(await deletestudens(_id));
});

//新增学生
router.post('/addStudents',async function(req, res){
  const {name,age,gender,classId,imageName}= req.body;
  const data=await addstudents({name,age,gender,classId,imageName});
  if(data.success){
    //将临时文件夹temp中的图片移动到永久文件夹images
   moveFiles({
      fromPath:'./public/temp',
      toPath:'./public/images',
      filename:imageName
    });
    //删除临时文件
    removeFiles('./public/temp');
  }
  res.send(data);
});

//获取一个学生
router.get('/upgetStudents',async function(req,res){
  const _id =req.query;
  res.send( await upgetstudents(_id));
});

//确认修改
router.post('/upConfirm',async function(req,res){
const {_id,name,age,gender}=req.body;
res.send(await upconfirm({_id,name,age,gender}));

})

module.exports = router;