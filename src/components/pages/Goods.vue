<template>
    <div>
        <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft()" />
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width="100%" />
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格：￥{{goodsInfo.ORI_PRICE | moneyFilter}}元</div>
        <div>
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.DETAIL"></div>
                </van-tab>
                <van-tab title="评论">
                    正在制作中
                </van-tab>
            </van-tabs>
        </div>
        
        <div class="goods-bottom">
            <div>
                <van-button @click="addGoodsToCart()" size="large" type="primary">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">直接购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { Toast } from 'vant'
    import url from '@/serviceAPI.config.js'
    import { toMoney } from '@/filter/moneyFilter.js'
    export default {
        name: 'Goods',
        data() {
            return {
                active: 1,
                goodsId: '',
                goodsInfo: {}
            }
        },
        created() {
            this.goodsId= this.$route.query.goodsId ? this.$route.query.goodsId:this.$route.params.goodsId;
            console.log(this.goodsId);
            this.getGoodsInfo();
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money);
            }
        },
        methods: {
            getGoodsInfo() {
                axios({
                    url: url.getDetailGoodsInfo,
                    method: 'post',
                    data: {
                        goodsId:  this.goodsId
                    }
                }).then(res=>{
                    console.log(res);
                    if(res.data.code === 200 && res.data.message) {
                        this.goodsInfo = res.data.message;
                    } else {
                        Toast('服务器错误，数据获取失败');
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            onClickLeft() {
                this.$router.go(-1);
            },
            addGoodsToCart() {
                // localStorage.clear();
                let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : [];
                console.log(cartInfo);
                let isHaveGoods = cartInfo.find(cart=>cart.goodsId == this.goodsId);
                if(!isHaveGoods) {
                    let newGoodsInfo = {
                        goodsId: this.goodsInfo.ID,
                        name: this.goodsInfo.NAME,
                        price: this.goodsInfo.PRESENT_PRICE,
                        image: this.goodsInfo.IMAGE1,
                        count: 1
                    };
                    cartInfo.push(newGoodsInfo);
                    localStorage.cartInfo = JSON.stringify(cartInfo);
                    Toast.success('添加成功');
                } else {
                    Toast.success('已有此商品');
                }
                this.$router.push('/cart');
            }
        }
    }
</script>

<style scoped>
    .goods-name, .goods-price {
        background-color: #fff;
    }
    .detail {
        font-size: 0px;
    }

    .goods-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
        width: 100%;
        background-color: #fff;
    }
    .goods-bottom > div {
        flex: 1;
        padding: 5px;
    }
</style>