var express = require('express');
var router = express.Router();

const {addteacher,getteacher,upgetTeacher,upteacher,deleone,getnateacher}= require('../service/teacherService.js');

router.post('/addTeacher', async function(req, res, next) {
    const {teachername,teacherage}= req.body;
   // console.log('diyiceng',req.body)
  res.send(await addteacher(teachername,teacherage)) ;
});
//分页获取所有老师
router.get('/getnateacher', async function(req, res, next) {
  const {type, value,pagesize, dangqianye}= req.query;
  res.send(await getnateacher({type, value,pagesize,dangqianye}));
});
//获取所有老师
router.get('/getTeacher',async function(req,res){
  res.send(await getteacher());
});
//根据ID获取要修改老师的信息
router.get('/upgetTeacher',async function(req,res){
  const _id =req.query;
  res.send(await upgetTeacher(_id));
});
//确认修改老师
router.post('/upteacher', async function(req,res){
  const {_id,teachername,teacherage} = req.body;
  res.send(await upteacher({_id,teachername,teacherage}));
});
//删除老师
router.post('/deleteone', async function(req,res){
 
  const {_id}= req.body;
 
  res.send(await deleone(_id));
});


module.exports = router;