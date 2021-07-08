const {classModel} = require('./models/classModel');

module.exports.addclass = async function(classes){
    return  (await classModel.create(classes));
};
module.exports.upclass = async function({_id,classname,teacherId}){
    return await classModel.updateOne({_id},{classname,teacherId});
};

module.exports.getclass = async function(){

    return await classModel.find().populate({
        path:'teacherId'
    });
};
module.exports.upgetoneclass= async function(_id){
    return await classModel.find({_id});
};
module.exports.deleteclass =async function(_id){
    return await classModel.deleteOne({_id});
};
//
module.exports.getaclass = async function({pagesize,dangqianye}){
    const totals= await classModel.countDocuments();
    const totalpages= Math.ceil(totals/pagesize);
    const rows = (await classModel.find().populate({
        path:'teacherId',
        //populate:{
        //    path:'teacherId'
        //}
    }).limit(pagesize-0).skip((dangqianye-1 )* pagesize) 
    )
    return {totals,totalpages,rows,pagesize,dangqianye}
};
module.exports.searchclass =async function({type, value,pagesize, dangqianye}){
    //精确查询
    //return await studentsModel.find({[type]:value});
    //模糊查询
    
    const totals=(await classModel.find({[type]:{$regex:value, $options: '$i'} })).length;
    const totalpages= Math.ceil(totals/pagesize);
    const rows = await classModel.find({[type]:{$regex:value, $options: '$i'} }).populate({
        path:'teacherId',
        //populate:{
        //    path:'teacherId'
       // }
    }).limit(pagesize-0).skip((dangqianye-1 )* pagesize);
    return{totals,totalpages,rows,pagesize,dangqianye}
}