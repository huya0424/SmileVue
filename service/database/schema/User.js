const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const bcrypt = require('bcrypt'); //加密算法
const SALT_WORK_FACTOR = 10; //加盐强度

// 创建UserSchema
const userSchema = new Schema({
    userId: {type: ObjectId}, //可以直接写 userId: String
    userName: {unique: true, type: String},
    password: {type: String}, //可以直接写 password: String
    createAt: {type: Date, default: Date.now()},
    lastLoginAt: {type: Date, default: Date.now()}
}, 
// {
//     collection: 'user'
// } 
// 由于数据库表默认会在表名后加一个's',变成"users"，在此处加入{collection: 'user'}可以让数据库表不加's'
)

userSchema.pre('save', function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=>{
        if(err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash)=>{
            if(err) return next(err);
            this.password = hash;
            next();
        })
    })
});

userSchema.methods = {
    // comparePassword: (客户端密码, 数据库密码)
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch)=>{
                if(!err) resolve(isMatch);
                else reject(err);
            })
        })
    }
}

// 发布模型
mongoose.model('User', userSchema);