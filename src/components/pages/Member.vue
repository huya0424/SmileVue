<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="会员中心" fixed />
        </div>
        <div class="top">
           <img :src="head" class="top-img" />
        </div>
        <div class="login-control">
            <div><van-button type="warning">我要登录</van-button></div>
            <div><van-button type="primary">我要注册</van-button></div>
        </div>
        <div>
            <van-cell-group>
                <van-cell title="会员卡" is-link />
                <van-cell title="地址管理" is-link />
                <van-cell title="我的订单" is-link />
                <van-cell title="会员权益" is-link />
                <van-cell title="联系我们" is-link />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Member',
        data() {
            return {
                head: require('@/assets/head.jpg'),
            }
        },
    }
</script>

<style scoped>
    .top {
        margin-top: 46px;
        padding-top: .8rem;
        height: 100px;
        text-align: center;
        background-color: #EEA2AD;
    }
    .top img {
        width: 70px;
        height: 70px;
        border-radius: 50px;
    }
    .login-control {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 80px;
        background-color: #fff;
    }

</style>