const Router = require('koa-router');
const router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');
// 插入商品信息
router.get('/insertAllGoodsInfo', async(ctx)=>{
    fs.readFile('./data_json/newGoods.json', 'utf8', (err, data)=>{
        let goodsInfo = JSON.parse(data);
        let saveCount = 0;
        const Goods = mongoose.model('Goods');
        goodsInfo.map((item, index)=>{
            let newGoods = new Goods(item);
            newGoods.save().then(()=>{
                saveCount++;
                console.log('成功:' + saveCount);
            }).catch(error=>{
                console.log('失败:' + error);
            })
        })

    })
    ctx.body = '开始导入数据';
});
// 插入商品类别（大类）
router.get('/insertAllCategory', async(ctx)=>{
    fs.readFile('./data_json/category.json', 'utf8', (err, data)=>{
        data = JSON.parse(data);
        const Category = mongoose.model('Category');
        let saveCount = 0;
        data.RECORDS.map((item, index)=>{
            let newCategory = new Category(item);
            newCategory.save().then(()=>{
                saveCount++;
                console.log('插入成功：' + saveCount);
            }).catch((error)=>{
                console.log('插入失败:' + error);
            })
        })
    })
    ctx.body = "开始导入数据。。。";
});
// 插入商品类别（小类）
router.get('/inserAllCategorySub', async(ctx)=>{
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data)=>{
        data = JSON.parse(data);
        const CategorySub = mongoose.model('CategorySub');
        let saveCount = 0;
        data.RECORDS.map((item, index) => {
            let newCategorySub = new CategorySub(item);
            newCategorySub.save().then(()=>{
                saveCount++;
                console.log('插入成功：' + saveCount);
            }).catch(error=>{
                console.log('插入失败：' + error);
            })
        })
    })
    ctx.body = '开始导入数据。。。';
})
// 获取商品详情
router.post('/getDetailGoodsInfo', async(ctx)=>{
    /*
    try {
        const GoodsInfo = mongoose.model('Goods');
        let goodsId = ctx.request.body.goodsId;
        let result = await GoodsInfo.findOne({ID: goodsId}).exec();
        ctx.body = {
            code: 200,
            message: result
        }
    } catch(error) {
        ctx.body = {
            code: 500,
            message: error
        }
    }
    以上方法与下面的方法一样
    */
    let goodsId = ctx.request.body.goodsId;
    const GoodsInfo = mongoose.model('Goods');
    // exec([cd]):cd是callback,exec(cd)即执行查询，并将查询结果传入回调函数cd
    await GoodsInfo.findOne({ID: goodsId}).exec().then(async(res)=>{
        ctx.body = {
            code: 200,
            message: res
        };
    }).catch(error=>{
        console.log(error);
        ctx.body = {
            code: 500,
            message: error
        }
    })

})

// 读取大类数据的接口
router.get('/getCategoryList', async(ctx)=>{
    try {
        const Category = mongoose.model('Category');
        let result = await Category.find().exec();
        ctx.body = {
            code: 200,
            message: result
        }
    } catch(err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})
// 读取小类数据的接口
router.post('/getCategorySubList', async(ctx)=>{
    try {
        let categoryId = ctx.request.body.categoryId;
        // let categoryId = 1;
        const CategorySub = mongoose.model('CategorySub');
        let result = await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec();
        ctx.body = {
            code: 200,
            message: result
        }
    } catch(err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})
// 根据商品类别获取商品列表
router.post('/getGoodsListByCategorySubID', async(ctx)=>{
    try {
        let categorySubId = ctx.request.body.categorySubId;
        let page = ctx.request.body.page; //每页显示数量
        let num = 10; //当前页
        let start = (page - 1) * num; // 每页数据开始位置

        const Goods = mongoose.model('Goods');
        let result = await Goods.find({SUB_ID: categorySubId})
        .skip(start).limit(num).exec();
        ctx.body = {
            code: 200,
            message: result
        }
    } catch(err) {
        console.log(err);
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

module.exports = router;