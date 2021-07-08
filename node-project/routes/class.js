var express = require('express');
var router = express.Router();
const {addclass,getclass,upgetoneclass,upclass,deleteclass,getnaclass} = require('../service/classService');

//新增班级
router.post('/addClass', async function(req,res){
    const {classname,teacherId} = req.body;
    res.send(await addclass({classname,teacherId}));
});
//获取所有班级
router.get('/getClass', async function(req,res){
    res.send(await getclass());
});
router.get('/getnaclass', async function(req, res, next) {
  const {type, value,pagesize, dangqianye}= req.query;
  res.send(await getnaclass({type, value,pagesize,dangqianye}));
});
//获取要修改的班级信息
router.get('/upgetoneclass',async function(req,res){
  const _id =req.query;
  res.send( await upgetoneclass(_id));
});
//确认修改班级
router.post('/upClass', async function(req,res){
  const {_id,classname,teacherId} = req.body;
  res.send(await upclass({_id,classname,teacherId}));
});
//删除班级
router.post('/deleteClass', async function(req,res){
 
  const {_id}= req.body;
 
  res.send(await deleteclass(_id));
});












module.exports = router;