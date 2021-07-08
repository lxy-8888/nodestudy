const {addteacher,getteacher,upgetTeacher,upteacher,deleone,getateacher,searchteacher} = require('../data/teacherdata.js');
module.exports.addteacher =async function(teachername,teacherage){
   const data= await addteacher(teachername,teacherage);
   if(data._id){
       return{msg:'老师新增成功', success: true,rows:data}
   }
}

module.exports.getteacher =async () =>{
     const data= await getteacher();
     if(data){
         return{msg:'获取老师成功',success:true, rows:data}
     }
}

module.exports.upgetTeacher=async function(_id){
    const dtt = await upgetTeacher(_id)
    if(dtt){
        return {msg:'数据获取成功', success:true, rows:dtt}
      }else{
        return {msg:'数据获取失败', success:false, rows:dtt}
      }
    
};

module.exports.upteacher = async function({_id,teachername,teacherage}){
  const data = await upteacher({_id,teachername,teacherage});

  if(data){
      return {msg:'修改成功' , success:true, data}
}
};

module.exports.deleone = async function(_id){
  const data = await deleone(_id);
 
  if(data.deletedCount >0 ){
      return{msg:'删除成功', success:true}
  }
     return {msg:'删除失败', success:false}
};
//分页获取所有老师
module.exports.getnateacher = async function({type, value,pagesize, dangqianye}){
  let data=[];
  if(value){
    data= await searchteacher({type, value,pagesize, dangqianye});
  }else{
    data =await getateacher({pagesize,dangqianye});
  }
    return {
      msg:'班级数据获取成功',
      success: true,
      data:data
}
 
};