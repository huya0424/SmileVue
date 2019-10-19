const BASEURL = 'https://www.easy-mock.com/mock/5da448471e2136176e0f4a4b/SmileVue/';
const LOCALURL = "http://localhost:3000/";
const URL = {
    getShoppingMallInfo: BASEURL + 'index', //首页
    getRegisterUser: LOCALURL + 'user/register', //用户注册接口
    getLoginUser: LOCALURL + 'user/login', //用户注册接口
};

module.exports = URL;
