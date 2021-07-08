const expressJWT =require('express-jwt');
const jwtAuth =expressJWT({
    secret: 'renyizifu',
    algorithms:['HS256'],
    credentialsRequired:true
}).unless({
    path:['/users/login','/users/register','/users/isUsername','class/addClass','students/upgetstudents']
})

//
module.exports =jwtAuth;