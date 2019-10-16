<template>
    <div>
        <!-- search area -->
        <div class="search-bar">
            <van-row gutter="5">
                <van-col span="3"><img :src="locationIcon" width="80%" class="location-icon" alt="定位" /></van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <!-- swiper area -->
        <div class="swiper-area">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="item in bannerPicArray" :key="item.goodsId">
                    <img v-lazy="item.image" width="100%" alt="banner">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- type bar area -->
        <div class="type-bar">
            <div v-for="item in category" :key="item.mallCategoryId">
                <img v-lazy="item.image" width="90%" alt="分类">
                <span>{{item.mallCategoryName}}</span>
            </div>
        </div>
        <!-- addBanner area -->
        <div class="add-banner">
            <img v-lazy="addBanner.PICTURE_ADDRESS" width="100%" alt="公告">
        </div>
        <!-- Recommend goods area -->
        <div class="recommend-goods">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="item in recommendGoods" :key="item.id">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%" alt="推荐">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- <SwiperDefault></SwiperDefault>
        <SwiperDefault1></SwiperDefault1>
        <SwiperDefault2></SwiperDefault2>
        <SwiperText></SwiperText> -->

        
        <!-- floor area -->
        <floor-component :floorData="floor1" :floorName="floorName.floor1"></floor-component>
        <floor-component :floorData="floor2" :floorName="floorName.floor2"></floor-component>
        <floor-component :floorData="floor3" :floorName="floorName.floor3"></floor-component>

        <!-- hot area -->
        <div class="hot-area">
            <div class="hot-title">
                热卖商品
            </div>
            <div class="hot-goods">
                <van-list>
                    <van-row>
                        <van-col span="12" v-for="item in hotGoods" :key="item.goodsId">
                            <goods-info-component :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info-component>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide } from 'vue-awesome-swiper'
    import url from '@/serviceAPI.config.js'
    import floorComponent from '../component/FloorComponent'
    import goodsInfoComponent from '../component/GoodsInfoComponent'
    import { toMoney } from '@/filter/moneyFilter.js'
    // import SwiperDefault from '../swiper/SwiperDefault'
    // import SwiperDefault1 from '../swiper/SwiperDefault1'
    // import SwiperDefault2 from '../swiper/SwiperDefault2'
    // import SwiperText from '../swiper/SwiperText'
    export default {
        name: 'ShoppingMall',
        data() {
            return {
                locationIcon: require('../../assets/images/location.png'), //如果不使用require,在打包上线之后可能会出现找不到的报错
                bannerPicArray:[],
                category: [],
                addBanner: '',
                recommendGoods: [],
                swiperOption: {
                    slidesPerView: 3
                },
                floor1: [],
                floor2: [],
                floor3: [],
                floorName: {},
                hotGoods: [],
            }
        },
        components: {
            swiper,
            swiperSlide,
            floorComponent,
            goodsInfoComponent
            // SwiperDefault,
            // SwiperDefault1,
            // SwiperDefault2,
            // SwiperText
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money);
            }
        },
        created() {
            axios({
                url:url.getShoppingMallInfo,
                method:'get'
            })
            .then((res)=>{
                this.bannerPicArray = res.data.data.slides;
                this.category = res.data.data.category;
                this.addBanner = res.data.data.advertesPicture;
                this.recommendGoods = res.data.data.recommend;
                this.floor1 = res.data.data.floor1;
                this.floor2 = res.data.data.floor2;
                this.floor3 = res.data.data.floor3;
                this.floorName = res.data.data.floorName;
                this.hotGoods = res.data.data.hotGoods;
                console.log(res);
            })
            .catch((error)=>{
                console.log(error);
            })
        },
    }
</script>

<style scoped>
    .search-bar {
        height: 2.2rem;
        line-height: 2.2rem;
        overflow: hidden;
        background-color: #e5017d;
    }
    .location-icon {
        padding-top: .2rem;
        padding-left: .3rem;
    }
    .search-input {
        width: 100%;
        height: 1.3rem;
        color: #fff;
        border:0;
        border-bottom: 1px solid #fff !important;
        background-color: #e5017d;
    }
    .swiper-area {
        clear: both;
        max-height: 9rem;
        overflow: hidden;
    }
    .type-bar {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;  /* 规定灵活的项目不拆行或不拆列 */
        margin: 0 .3rem .3rem .3rem;
        font-size: 14px;
        border-radius: .3rem;
        background-color: #fff;
    }
    .type-bar > div {
        padding: .3rem;
        font-size: 12px;
        text-align: center;
    }
    .recommend-goods {
        margin-top: .3rem;
        background-color: #fff;
    }
    .recommend-title {
        padding: .2rem;
        font-size: 14px;
        color: #e5017d;
        border-bottom: 1px solid #eee;
    }
    .recommend-body {
        border-bottom: 1px solid #eee;
    }
    .recommend-item {
        width: 99%;
        font-size: 12px;
        text-align: center;
        border-right: 1px solid #eee;
    }
    .hot-goods {
        background-color: #fff;
    }
    .hot-title {
        height: 1.8rem;
        line-height: 1.8rem;
        font-size: 14px;
        text-align: center;
    }

</style>
