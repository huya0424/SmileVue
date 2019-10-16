<template>
    <div class="floor">
        <div class="floor-title">
            {{floorName}}
        </div>
        <div class="floor-anomaly">
            <div class="floor-one">
                <img :src="floorData0.image" width="100%" alt="图1">
            </div>
            <div>
                <div class="floor-two">
                    <img :src="floorData1.image" width="100%" alt="图2">
                </div>
                <div>
                    <img :src="floorData2.image" width="100%" alt="图3">
                </div>
            </div>
        </div>
        <div class="floor-rule">
            <div v-for="(item, index) in floorData.slice(3)" :key="index">
                <img :src="item.image" width="100%" alt="图片">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['floorData', 'floorName'],
        data() {
            return {
                floorData0: {},
                floorData1: {},
                floorData2: {},
            }
        },
        created() {
        },
        watch: {
            // 如果父组件传的是复合型的值（数组，对象），则写在watch里面，否则在取属性值时，容易报属性值未定义
            // 也可以使用promise,async,await进行异步加载来代替watch
            // 如果父组件传的是基本类型的值，则不用写在watch里面也可以正常运行
            floorData: function(val) {
                this.floorData0 = this.floorData[0];
                this.floorData1 = this.floorData[1];
                this.floorData2 = this.floorData[2];
            }
        }
    }
</script>

<style scoped>
    .floor-title {
        height: 1.8rem;
        line-height: 1.8rem;
        font-size: 14px;
        text-align: center;
    }
    .floor-anomaly {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #eee;
        background-color: #fff;
    }
    .floor-anomaly > div {
        width: 10rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .floor-one {
        border-right: 1px solid #eee;
    }
    .floor-two {
        border-bottom: 1px solid #eee;
    }
    .floor-rule {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #fff;
    }
    .floor-rule div {
        width: 10rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
    }
    .floor-rule div:nth-child(odd) {
        border-right: 1px solid #eee;
    }
</style>