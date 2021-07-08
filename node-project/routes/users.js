var express = require('express');
var router = express.Router();
const jwt=require('jsonwebtoken');
const {getMd5 } =require('../utils/crypto.js');
const bcryptjs =require('bcryptjs');
const { login,isUsername, register} = require('../service/usersService.js');
//登录
router.post('/login', async function(req, res, next) {
  const {username,password} = req.body;
  const newpassword=getMd5(password);
  const data= await login({username,password:newpassword})
        if(data.success){
            const temp=data.islogin;
            const token=jwt.sign({temp},'renyizifu',{expiresIn:2099});
            console.log('dierceng',data)
           res.send ({msg:'登录成功',success:true,token});
        }else{
          res.send ({msg:'登录失败',success:false});
              }
});
//是否登录
router.post('/islogin', async function(req, res, next){
      const tokenStr=req.get('Authorization');
      const token=tokenStr.split(' ')[1];
      const username=jwt.verify(token,'renyizifu');
      res.send({
        msg:'用户已登录',
        success:true,
        username
      });
});

//验证用户是否存在
router.get('/isUsername', async function(req, res, next) {
  const {username} = req.query;
  res.send( await isUsername(username));
});


//注册
router.post('/register',async function(req, res, next){
  const {username,password} = req.body;
  //对传过来的密码进行加密
  //md5
   const newpassword=getMd5(password);
  // bcryptjs加密方试则 需要先通过名字拿到加密后的密码然后compare判断密码是否相等

  res.send(await register({username,password:newpassword}));

});


module.exports = router;
