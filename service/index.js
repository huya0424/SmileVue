const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const { connect, initSchemas } = require('./database/init.js');
const user = require('./appApi/user.js');

app.use(bodyParser()).use(cors());//cors解决垮域
//装载子路由
router.use('/user', user.routes());
//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());


// 立即执行函数
;(async ()=>{
    await connect();
    initSchemas();
})();

// app.use(async(ctx) => {
//     ctx.body = "<h2>Hello koa2</h2>";
// });

app.listen(3000, ()=>{
    console.log('[Server] starting at port 3000');
})