const {login,isUsername,register} = require('../data/usersdata.js');

module.exports.login = async function(username,password){
  //调用第三层的login方法
    const islogin = await login(username,password);

    if(islogin.length > 0){
      return ({ msg: '登陆成功', success: true,islogin});
    }else{
      return ({ msg: '登录失败', success: false,islogin});
   } ;
};

module.exports.isUsername = async function(username){
 const data = await isUsername(username);
 
 if (data.length >0 ){
  return { msg: '用户已存在', success: true };
}else{
  return  {msg:'用户可使用', success: false};
  };
};
module.exports.register = async function(username,password){

  const data= await register(username,password);
  
  if(data._id){
  return({msg: '注册成功', success:true});
}else{
  return({msg: '注册失败', success:false});
};

};