const mongoose =require('mongoose');
const dbURI = 'mongodb://localhost/web04';
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',function(){
  console.log(dbURI + '数据库连接成功' );
});