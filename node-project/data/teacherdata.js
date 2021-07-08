const {teacherModel} = require('./models/teacherModel');

module.exports.addteacher = async function(teachername,teacherage){
    return await teacherModel.create({teachername,teacherage});
}

module.exports.getteacher =async ()=> {

    return await teacherModel.find()
}

module.exports.upgetTeacher = async function(_id){
    return await teacherModel.find({_id});
};

module.exports.upteacher = async function({_id,teachername,teacherage}){
    return await teacherModel.updateOne({_id},{teachername,teacherage});
};

module.exports.deleone =async function(_id){
    return await teacherModel.deleteOne({_id});
};
//分页获取老师
module.exports.getateacher = async function({pagesize,dangqianye}){
    const totals= await teacherModel.countDocuments();
    const totalpages= Math.ceil(totals/pagesize);
    const rows = (await teacherModel.find().populate({
        path:'classId',
        //populate:{
        //    path:'teacherId'
        //}
    }).limit(pagesize-0).skip((dangqianye-1 )* pagesize) 
    )
    
    return {totals,totalpages,rows,pagesize,dangqianye}
};
module.exports.searchteacher =async function({type, value,pagesize, dangqianye}){
    //精确查询
    //return await studentsModel.find({[type]:value});
    //模糊查询
    
    const totals=(await teacherModel.find({[type]:{$regex:value, $options: '$i'} })).length;
    const totalpages= Math.ceil(totals/pagesize);
    const rows = await teacherModel.find({[type]:{$regex:value, $options: '$i'} }).populate({
        path:'classId',
        populate:{
            path:'teacherId'
        }
    }).limit(pagesize-0).skip((dangqianye-1 )* pagesize);
    return{totals,totalpages,rows,pagesize,dangqianye}
}