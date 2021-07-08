const multer = require('multer');
const fs = require('fs');
const path = require('path');

//文件上传

function uploadFiles(options = {}) {

    const { path = "./public/temp", key = "file", size = 1000 } = options;
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            try {
                fs.accessSync(path);
            } catch (error) {
                fs.mkdirSync(path);
            }
            cb(null, path);
        },
        //2.2 确定图片存储时的名字

        filename: function (req, file, cb) {
            var changedName = new Date().getTime() + '-' + file.originalname;
            cb(null, changedName);
        }
    });
    //3.配置图片限制
    const limits = {
        fileSize: 1024 * size,
        files: 5
    };
    //生成的专门处理上传的一个工具，可以传入storage,limits等配置
    const upload = multer({ storage, limits });
    //5.返回多文件上传的设置信息
    return upload.array(key);

}
//复制文件

function copyFiles(options = {}) {
    const { fromPath = './public/temp/', toPath = './public/images/', filename } = options;
    let sourceFile = path.join(fromPath, filename);
    let destPath = path.join(toPath, filename);
    try {
        fs.accessSync(toPath);

    } catch (error) {
        fs.mkdirSync(toPath);

    }
    let readStream = fs.createReadStream(sourceFile);
    let writeStream = fs.createWriteStream(destPath);
    readStream.pipe(writeStream);

}

//移动文件
function moveFiles(options = {}) {
    const { fromPath = './public/temp', toPath = './public/images', filename } = options;
    var sourceFile = path.join(fromPath, filename);
    var destPath = path.join(toPath, filename);
    try {
        fs.accessSync(toPath);
    } catch (error) {
        fs.mkdirSync(toPath);
    }
    fs.renameSync(sourceFile, destPath);
    return {

        path: destPath
    };
}



//删除文件
function removeFiles(filePath = "./public/temp") {
    const isExist = fs.existsSync(filePath);
    if (isExist) {
        let stats = fs.statSync(filePath);
        //判断是否是文件
        if (stats.isFile()) {
            //删除文件

            fs.unlinkSync(filePath)
        } else if (stats.isDirectory()) {
            let filesArr = fs.readdirSync(filePath);
            filesArr.forEach(file => {
                removeFiles(path.resolve(filePath, file));
            })
            fs.rmdirSync(filePath);
        }


    } else {


    }


}
module.exports = { uploadFiles, copyFiles, moveFiles, removeFiles }