const mongoose = require('mongoose');
//设置数据结构
const studentsSchema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  classId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'classModel',
  },
  imageName:String
},{versionKey:false});
//设置数据模型
//模型名称，结构名称，集合名称
module.exports.studentsModel =mongoose.model('studentsModel',studentsSchema,'students');
