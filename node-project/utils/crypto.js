const crypto =require("crypto");//
/**
 * @md5加密模块（加密固定，不可逆）
 * @param  str string   要加密的字符串
 * @param  secret string 要使用的加密密匙
 * @return string 加密后的字符串
 */
module.exports.getMd5 =function(str,secret='9vApxLk5G3PAsJrm')
{const md5=crypto.createHash('md5');
return md5.update(str+secret).digest('hex');
}
/**
 * @aes128加密模块
 * @param str string 要加密的字符串
 * @param  secret string 要使用的加密密匙（要记住，不然就解不了密啦）
 *  @return string 加密后的字符串
 */
module.exports.getEncAse128 =function(str,secret='9vApxLk5G3PAsJrm',iv='FnJL7EDzjqWj')
{const cipheriv=crypto.createCipheriv('aes-128-cbc',secret,iv);
var enc=cipheriv.update(str,"utf8","hex");//编码方式从utf-8转为hex;
enc += cipheriv.final("hex");
return enc;
}