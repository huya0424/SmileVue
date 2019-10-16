<template>
    <div>
        <swiper :options="swiperOption">
            <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
                Slide{{item}}
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                slide: [1,2,3,4,5],
                swiperOption: {
                    loop: true,//设置无限循环滚动
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true //设置分页器选择功能
                    }
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style scoped>
    .swiper-slide {
        padding-top: 3rem;
        height: 4rem;
        border-bottom: 1px solid #ccc;
        text-align: center;
    }
</style>