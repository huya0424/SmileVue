<template>
    <div>
        <div class="main-div">
            <router-view />
        </div>
        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">列表</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                nowPath: ''
            }
        },
        created() {
            this.changeTabbarActive();
        },
        updated () {
            this.changeTabbarActive();
        },
        methods: {
            changeTabbarActive() {
                this.nowPath = this.$route.path;
                switch(this.nowPath) {
                    case '/':
                        this.active = 0;
                        break;
                    case '/categorylist':
                        this.active = 1;
                        break;
                    case '/cart':
                        this.active = 2;
                        break;
                    case '/member':
                        this.active = 3;
                        break;
                }
                // if(this.nowPath === '/categorylist') {
                //     this.active = 1;
                // } else if(this.nowPath === '/cart') {
                //     this.active = 2;
                // }
                console.log(this.nowPath);
            },
            changeTabbar(active) {
                switch(active) {
                    case 0: 
                        this.$router.push({name:'ShoppingMall'})
                        break;
                    case 1: 
                        this.$router.push({name: 'CategoryList'});
                        break;
                    case 2: 
                        this.$router.push({name: 'Cart'});
                        break;
                    case 3: 
                        this.$router.push({name: 'Member'});
                        break;
                }
            }
        }
    }
</script>

<style scoped>

</style>