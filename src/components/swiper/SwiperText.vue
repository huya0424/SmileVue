<template>
    <div>
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide class="text" >
                <div class="content">
                    NGINX | High Performance Load Balancer, Web Server ...
https://www.nginx.com
翻译此页
NGINX accelerates content and application delivery, improves security, facilitates availability and scalability for the busiest web sites on the Internet.
Nginx
https://nginx.org › ...
翻译此页
nginx [engine x] is an HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server, originally written by Igor Sysoev. For a long time ...
‎Nginx documentation · ‎Controlling nginx · ‎NGINX Unit · ‎Download
8分钟带你深入浅出搞懂Nginx - 知乎
https://zhuanlan.zhihu.com › ...
2018年3月25日 - 分享一篇来自简书的文章，对Nginx的讲解非常到位，文章链接：深入浅出Nginx，作者主页：张丰哲- 简书。Nginx是一款轻量级的Web服务器、反向 ...
nginx_百度百科
https://baike.baidu.com › item › nginx
Nginx (engine x) 是一个高性能的HTTP和反向代理web服务器，同时也提供了IMAP/POP3/SMTP服务。Nginx是由伊戈尔·赛索耶夫为俄罗斯访问量第二的Rambler.ru ...
软件许可‎: ‎BSD许可	软件类型‎: ‎开源软件,网页服务器软件
Nginx - 维基百科，自由的百科全书
https://zh.wikipedia.org › zh-hans › Nginx
Nginx（发音同engine x）是异步框架的網頁伺服器，也可以用作反向代理、负载平衡器和HTTP缓存。该软件由伊戈爾·賽索耶夫创建并于2004年首次公开发布。 2011年 ...
许可协议‎: ‎类BSD	開發者‎: ‎NGINX, Inc
原作者‎: ‎伊戈尔·赛索耶夫	初始版本‎: ‎2004年10月4日，​14年前
‎特点 · ‎与Apache相比 · ‎PHP整合
Nginx 配置详解| 菜鸟教程
www.runoob.com › nginx-setup-intro
序言Nginx是lgor Sysoev为俄罗斯访问量第二的rambler.ru站点设计开发的。从2004年发布至今，凭借开源的力量，已经接近成熟与完善。 Nginx功能丰富，可 ...
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                swiperOption: {
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    freeMode: true,
                    mousewheel: true
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
    .swiper {
        height: 200px;
        overflow: auto;
    }
    .text {
        padding: 30px;
        height: auto;
        font-size: 18px !important;
        text-align: left;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>