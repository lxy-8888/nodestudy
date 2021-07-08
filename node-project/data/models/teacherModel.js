const mongoose = require('mongoose');
//设置数据结构
const teacherSchema = new mongoose.Schema({
  teachername: String,
  teacherage: String
},{versionKey:false});
//设置数据模型
//模型名称，结构名称，集合名称
module.exports.teacherModel =mongoose.model('teacherModel',teacherSchema,'teacher');