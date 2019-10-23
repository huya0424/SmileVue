<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="购物车" />
        </div>
        <div class="cart-title">
            <van-button type="danger" size="small" @click="clearCart" plain>清空购物车</van-button>
        </div>
        <div class="cart-list">
            <div class="cart-row" v-for="(item, index) in cartInfo" :key="index">
                <div class="cart-goods-img">
                    <img :src="item.image" width="100%" alt="商品图片" />
                </div>
                <div class="cart-goods-text">
                    <div class="cart-goods-name">{{item.name}}</div>
                    <div class="cart-control">
                        <van-stepper v-model="item.count" />
                    </div>
                </div>
                <div class="cart-goods-price">
                    <div>￥{{item.price | moneyFilter}}</div>
                    <div>×{{item.count}}</div>
                    <div class="all-price">￥{{item.price * item.count | moneyFilter}}</div>
                </div>
            </div>
            <div class="total-money">
                商品总价：￥{{totalMoney | moneyFilter }}
            </div>
        </div>
    </div>
</template>

<script>
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        data() {
            return {
                cartInfo: [],
                isEmpty: false,
            }
        },
        computed: {
            totalMoney() {
                let newTotalMoney = 0;
                this.cartInfo.forEach((item) => {
                    newTotalMoney += item.price*item.count;
                });
                localStorage.cartInfo = JSON.stringify(this.cartInfo);
                return newTotalMoney;
            }
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money);
            }
        },
        created() {
            this.getCartInfo();
        },
        methods: {
            //获取购物车数据
            getCartInfo() {
                if(localStorage.cartInfo) {
                    this.cartInfo  = JSON.parse(localStorage.cartInfo);
                }
                console.log('cartInfo: ' + JSON.stringify(this.cartInfo));
                this.isEmpty = this.cartInfo.length > 0 ? false : true;
            },
            clearCart() {
                localStorage.removeItem("cartInfo");
                this.cartInfo = [];
            }
        }
    }
</script>

<style scoped>
    .cart-title {
        padding: 0.5rem;
        height: 2rem;
        /* line-height: 2rem; */
        text-align: right;
        border-bottom: 1px solid #e4e7ed;
        background-color: #fff;
    }
    .cart-list {
        margin-bottom: 80px;
    }
    .cart-list, .cart-control{
        background-color: #fff;
    }
    .cart-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 0.5rem;
        font-size: 0.8rem;
        border-bottom: 1px solid #e4e7ed;
    }
    .cart-goods-img {
        flex: 6;
    }
    .cart-goods-text {
        flex: 14;
        padding: 10px;
    }
    .cart-control {
        padding-top: 10px;
    }
    .cart-goods-price {
        flex: 4;
        padding-top: 10px;
        text-align: right;
    }
    .all-price {
        color: red;
    }
    .total-money {
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 20px;
        padding-right: 20px;
        width: calc(100% - 40px);
        font-size: 0.8rem;
        text-align: right;
        border-top: 1px solid #e4e7ed;
        background-color:#fff;
    }
</style>