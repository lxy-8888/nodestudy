const mongoose = require('mongoose');
const classSchema = new mongoose.Schema({
   classname:String,
   teacherId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'teacherModel'
   }

},{versionKey:false});
module.exports.classModel = mongoose.model('classModel', classSchema , 'class');