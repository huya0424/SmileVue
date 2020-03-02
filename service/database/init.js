const mongoose = require('mongoose');
const db = "mongodb://localhost/smile-db";
const glob = require('glob');
const { resolve } = require('path');

exports.initSchemas = () =>{
    //引入Schema的所有文件
    glob.sync(resolve(__dirname, './schema/','**/*.js')).forEach(require);
}

// mongoose.Promise = global.Promise;

exports.connect = ()=>{
    // 连接数据库
    mongoose.connect(db);
    let maxConnectTimes = 0;

    return new Promise((resolve, reject) => {
        mongoose.connection.on('disconnected', (err)=>{
            console.log('-----数据库断开--------');
            if(maxConnectTimes <= 3) {
                maxConnectTimes++;
                mongoose.connect(db);
            } else {
                reject(err);
                throw new Error('数据库出现问题，程序无法搞定，请人为处理。。。');
            }
            
        });
    
        mongoose.connection.on('error', ()=>{
            console.log('-----数据库错误--------');
            if(maxConnectTimes <= 3) {
                maxConnectTimes++;
                mongoose.connect(db);
            } else {
                reject(err);
                throw new Error('数据库出现问题，程序无法搞定，请人为处理。。。')
            }
            
        });
    
        mongoose.connection.once('open', ()=>{
            console.log('MongoDB connected successfully');
            resolve();
        })
    })
}