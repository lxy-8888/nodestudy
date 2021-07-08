const {studentsModel} = require('./models/studentsModel.js');
module.exports.getstudents = async function({pagesize,dangqianye}){
    const totals= await studentsModel.countDocuments();
    const totalpages= Math.ceil(totals/pagesize);
    const rows = (await studentsModel.find().populate({
        path:'classId',
        populate:{
          path:'teacherId'
        }
    }).limit(pagesize-0).skip((dangqianye-1 )* pagesize) 
    )
    return {totals,totalpages,rows,pagesize,dangqianye}
};
module.exports.searchStudents =async function({type, value,pagesize, dangqianye}){
    //精确查询
    //return await studentsModel.find({[type]:value});
    //模糊查询
    
    const totals=(await studentsModel.find({[type]:{$regex:value, $options: '$i'} })).length;
    const totalpages= Math.ceil(totals/pagesize);
    const rows = await studentsModel.find({[type]:{$regex:value, $options: '$i'} }).populate({
        path:'classId',
        populate:{
           path:'teacherId'
        }
    }).limit(pagesize-0).skip((dangqianye-1 )* pagesize);
    return{totals,totalpages,rows,pagesize,dangqianye}
}
module.exports.deletestudens =async function(_id){
    return (await studentsModel.deleteOne({_id}));
};
module.exports.addstudents =async function(data){
    
    return  await studentsModel.create(data)
};

module.exports.upgetstudents = async function(_id){
    return await studentsModel.find({_id});
};

module.exports.upconfirm =async function({_id,name,age,gender}){
    return await studentsModel.updateOne({_id},{name,age,gender});
}