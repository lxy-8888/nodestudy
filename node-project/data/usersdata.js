const {usersModel} = require('./models/usersModel');
module.exports.login = async function(user){
return await usersModel.find (user);
 
};
module.exports.isUsername = async function(username){
  
  return (await usersModel.find({username}));
};

module.exports.register = async function(user){

  return (await usersModel.create(user)) ;
};