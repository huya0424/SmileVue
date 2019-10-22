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
                    <van-tabs v-model="active">
                        <van-tab v-for="item in catetorySub" :title="item.MALL_SUB_NAME" :key="item.ID">
                            
                        </van-tab>
                    </van-tabs>
                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                            <van-list v-model="loading" :finished="finished" @load="onLoad">
                                <div v-for="(item, index) in list" class="list-item" :key="index">{{item}}</div>
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
    export default {
        data() {
            return {
                active: 0,
                category: [], //大类类别
                catetorySub: [], //小类类别
                categoryIndex: 0,
                loading: false, //上拉加载
                finished: false, //是否加载结束
                list: [], //商品数据
                isRefresh: false, //下拉刷新
            }
        },
        created() {
            this.getCategory();
        },
        mounted () {
            let height = document.documentElement.clientHeight;
            document.getElementById('leftNav').style.height = height - 46 + 'px';
            document.getElementById('list-div').style.height = height - 90 + 'px';
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
                        this.getCategorySubByCategoryId(this.category[0].ID)
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
                    console.log(res);
                    if(res.data.code === 200 && res.data.message) {
                        this.active = 0;
                        this.catetorySub = res.data.message;
                    } else {
                        Toast('服务器错误，数据获取失败');
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            clickCategory(index, categoryId) {
                this.categoryIndex = index;
                this.getCategorySubByCategoryId(categoryId);
            },
            onLoad() {
                setTimeout(() => {
                    for(let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    this.loading = false;
                    if(this.list.length >= 40) {
                        this.finished = true;
                    }
                }, 500);
            },
            onRefresh() {
                setTimeout(() => {
                    this.isRefresh = false;
                    this.finished = false;
                    this.list = [];
                    this.onLoad();
                }, 500);
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
    .list-item {
        line-height: 80px;
        text-align: center;
        background-color: #fff;
        border-bottom: 1px solid #f0f0f0;
    }
    #list-div {
        overflow: scroll;
    }
</style>