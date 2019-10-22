<template>
    <div class="goods-info" @click="getGoodsInfo">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%" alt="热卖商品">
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneyFilter}}</div>
    </div>
</template>

<script>
    import { toMoney } from '@/filter/moneyFilter.js'
    export default {
        props: ['goodsId', 'goodsImage', 'goodsName', 'goodsPrice'],
        data() {
            return {

            }
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money)
            }
        },
        methods: {
            getGoodsInfo() {
                this.$router.push({name: 'Goods', query: {goodsId: this.goodsId}});
            }
        }
    }
</script>

<style scoped>
    .goods-name {
        padding: 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .goods-price {
        padding: 0 8px;
    }
</style>