const Router = require('koa-router');
const mongoose = require('mongoose');

const router = new Router();
router.get('/', async(ctx) => {
    ctx.body = '这是用户操作首页';
});
router.post('/register', async(ctx) => {
    const User = mongoose.model('User');
    let oneUser = new User(ctx.request.body);
    await oneUser.save().then(()=>{
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch((error)=>{
        ctx.body = {
            code: 500,
            message: error
        }
    })
    // console.log(ctx.request.body);
    // ctx.body = ctx.request.body;
});

router.post('/login', async(ctx) => {
    //得到前端传过来的数据
    let loginUser = ctx.request.body;
    console.log(loginUser);
    let userName = loginUser.userName;
    let password = loginUser.password;
    //引入User的model
    const User = mongoose.model('User');
    //查找用户名是否存在，如果存在开始比对密码
    await User.findOne({userName:userName}).exec().then(async(result)=>{
        if(result) {
            // 用户名存在，开始比对密码
            let oneUser = new User(); //因为是实例方法，所以要new出对象，才能调用
            await oneUser.comparePassword(password, result.password)
            .then((isMatch)=>{
                ctx.body = {
                    code: 200,
                    message: isMatch
                }
            })
            .catch(error=>{
                console.log(error);
                ctx.body = {
                    code: 500,
                    message: error
                }
            })
        } else {
            ctx.body = {
                code: 200,
                message: '用户名不存在'
            }
        }
    })
    .catch((error)=>{
        console.log(error);
        ctx.body = {
            code: 500,
            message: error
        }
    })

})
module.exports = router;
