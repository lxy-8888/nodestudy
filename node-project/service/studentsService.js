const{getstudents,deletestudens,addstudents,searchStudents,upgetstudents,upconfirm} = require('../data/studentsdata.js');

module.exports.getstudents = async function({type, value,pagesize, dangqianye}){
    let data=[];
    if(value){
      data= await searchStudents({type, value,pagesize, dangqianye});
    }else{
      data =await getstudents({pagesize,dangqianye});
    }
      return {
        msg:'学生数据获取成功',
        success: true,
        data
}
   
};

module.exports.deletestudens = async function(_id){
   const data = await deletestudens(_id);
  

   if(data.deletedCount >0 ){
       return{msg:'删除成功', success:true}
   }
      return {msg:'删除成功', success:false}
};

module.exports.addstudents =async function(data){
   const newadd = await addstudents(data)

   if(newadd._id){
    // console.log('dierceng',newadd)
       return {msg:'新增成功', success:true,data:newadd}
   }
      return {msg:'新增失败', success:false}
};

module.exports.upgetstudents=async function(_id){
  const data = await upgetstudents(_id);
 
  if(data){
    return {msg:'数据获取成功', success:true, rows:data}
  }else{
    return {msg:'数据获取失败', success:false, rows:data}
  }

};
//确认修改
module.exports.upconfirm = async function({_id,name,age,gender}){
     const data= await upconfirm({_id,name,age,gender});
         if(data){
           return {msg:'修改成功' , success:true, rows:data}
   }

};
