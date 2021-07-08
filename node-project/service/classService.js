const {addclass,getclass,upgetoneclass,upclass,deleteclass,searchclass,getaclass} = require('../data/classdata');

module.exports.addclass = async function(classes){
    const data = await addclass(classes);
 
    if(data._id){
        return{msg:'新增班级成功', success:true,rows:data}
    }else{
        return{msg:'新增班级失败', success:false}
    }
};

module.exports.getclass = async function(){
    const dao = await getclass();
    return{msg:'获取所有班级成功', success:true, rows:dao}

};
module.exports.upgetoneclass=async function(_id){
    const dc =await upgetoneclass(_id)
    if(dc){
        return {msg:'数据获取成功', success:true, rows:dc}
      }else{
        return {msg:'数据获取失败', success:false, rows:dc}
      }
    
};
module.exports.upclass = async function({_id,classname,teacherId}){
    const data = await upclass({_id,classname,teacherId});
 
    if(data){
        return {msg:'修改成功' , success:true, data}
}
};
module.exports.deleteclass = async function(_id){
    const data = await deleteclass(_id);
   
    if(data.deletedCount >0 ){
        return{msg:'删除成功', success:true}
    }
       return {msg:'删除失败', success:false}
 };

 //
 module.exports.getnaclass = async function({type, value,pagesize, dangqianye}){
    let data=[];
    if(value){
      data= await searchclass({type, value,pagesize, dangqianye});
    }else{
      data =await getaclass({pagesize,dangqianye});
    }
      return {
        msg:'班级数据获取成功',
        success: true,
        data:data
}
   
};