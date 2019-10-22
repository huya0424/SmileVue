const BASEURL = 'https://www.easy-mock.com/mock/5da448471e2136176e0f4a4b/SmileVue/';
const LOCALURL = "http://localhost:3000/";
const URL = {
    getShoppingMallInfo: BASEURL + 'index', //首页
    getRegisterUser: LOCALURL + 'user/register', //用户注册接口
    getLoginUser: LOCALURL + 'user/login', //用户注册接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //获取商品详情
    getCategoryList: LOCALURL + 'goods/getCategoryList', //获取商品类型（大类）
    getCategorySubList: LOCALURL + 'goods/getCategorySubList', //获取商品类型（小类）
    getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID', //获取小类商品信息
};

module.exports = URL;
