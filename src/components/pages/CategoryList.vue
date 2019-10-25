<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表"/>
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li v-for="(item, index) in category" @click="clickCategory(index, item.ID)" :class="{categoryActive: categoryIndex === index}" :key="item.ID">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <van-tabs v-model="active" @click="clickCategorySub">
                        <van-tab v-for="item in categorySub" :title="item.MALL_SUB_NAME" :key="item.ID"></van-tab>
                    </van-tabs>
                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                            <van-list v-model="loading" :finished="finished" @load="onLoad">
                                <div v-for="(item, index) in goodsList" @click="goGoodsInfo(item.ID)" class="list-item" :key="index">
                                    <div class="list-item-img">
                                        <img :src="item.IMAGE1" :onerror="errorImg" width="100%" />
                                    </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import url from '@/serviceAPI.config.js'
    import {Toast} from 'vant'
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        data() {
            return {
                active: 0,
                category: [], //大类类别
                categorySub: [], //小类类别
                categorySubId: '', //商品子分类ID
                categoryIndex: 0, //当前大类位置，用于给当前大类添加背景颜色
                loading: false, //上拉加载
                finished: false, //是否加载结束
                goodsList: [], //商品数据
                page: 1, //数据列表当前页
                isRefresh: false, //下拉刷新
                errorImg: "this.src='" + require('@/assets/errorimg.png') + "'", //图片失效
            }
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money);
            }
        },
        created() {
            this.getCategory();
        },
        mounted () {
            let height = document.documentElement.clientHeight;
            document.getElementById('leftNav').style.height = height - 46 - 50 + 'px';
            document.getElementById('list-div').style.height = height - 90 - 50 + 'px';
        },
        
        methods: {
            getCategory() {
                axios({
                    url: url.getCategoryList,
                    method: 'get'
                }).then(res=>{
                    console.log(res);
                    if(res.data.code === 200 && res.data.message) {
                        this.category = res.data.message;
                        this.getCategorySubByCategoryId(this.category[0].ID);
                    } else {
                        Toast('服务器错误，数据获取失败')
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            getCategorySubByCategoryId(categoryId) {
                axios({
                    url: url.getCategorySubList,
                    method: 'post',
                    data: {
                        categoryId: categoryId
                    }
                }).then(res=>{
                    // console.log(res);
                    if(res.data.code === 200 && res.data.message) {
                        this.active = 0;
                        this.categorySub = res.data.message;
                        this.categorySubId = this.categorySub[0].ID;
                        this.onLoad();
                    } else {
                        Toast('服务器错误，数据获取失败');
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            getGoodsList(){
                axios({
                    url:url.getGoodsListByCategorySubID,
                    method:'post',
                    data:{
                        categorySubId:this.categorySubId,
                        page:this.page
                    }
                })
                .then(res=>{
                    if(res.data.code == 200 && res.data.message.length ){
                        this.page++
                        this.goodsList=this.goodsList.concat(res.data.message)
                    }else{
                        this.finished = true;
                    }
                    this.loading=false;
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            clickCategory(index, categoryId) {
                this.goodsList = [];
                this.page = 1;
                this.categoryIndex = index;
                this.finished = false;
                this.getCategorySubByCategoryId(categoryId);
            },
            clickCategorySub(index) {
                this.categorySubId = this.categorySub[index].ID;
                this.page = 1;
                this.goodsList = [];
                this.finished = false;
                this.onLoad();
            },
            onLoad() {
                setTimeout(() => {
                    this.categorySubId = this.categorySubId ? this.categorySubId:this.categorySub[0].ID;
                    this.getGoodsList();
                }, 1000);
            },
            onRefresh() {
                setTimeout(() => {
                    this.isRefresh = false;
                    this.finished = false;
                    this.goodsList = [];
                    this.page = 1;
                    this.onLoad();
                }, 500);
            },
            goGoodsInfo(id) {
                this.$router.push({name:'Goods',query:{goodsId:id}});
            }
        }
    }
</script>

<style scoped>
    #leftNav {
        background-color: aliceblue;
    }
    #leftNav ul li {
        padding: 3px;
        line-height: 2rem;
        font-size: 0.8rem;
        text-align: center;
        border: 1px solid #e4e7ed;
    }
    .categoryActive {
        background-color: #fff;
    }
    #list-div {
        overflow: scroll;
    }
    .list-item {
        display: flex;
        flex-direction: row;
        padding: 5px;
        font-size: 0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
    }
    .list-item-img {
        flex: 8;
    }
    .list-item-text {
        flex: 16;
        margin-top: 10px;
        margin-left:10px;
    }
</style>