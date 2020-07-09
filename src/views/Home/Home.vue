<template>
  <div class="Statistics">
    <div class="top">
      <div class="item" v-for="(v,i) in Item" :key="i">
        <div class="img">
          <img :src="v.imgSrc" alt />
        </div>
        <div class="sales-data">
          <p class="text">{{v.text}}</p>
          <p class="num">{{v.number}}</p>
        </div>
      </div>
    </div>
    <div class="statistical-curve">
      <Echarts />
    </div>
  </div>
</template>

<script>
// Echarts
import Echarts from "./Echarts.vue";
export default {
  components: {
    Echarts
  },
  data() {
    return {
      Item: [
        {
          imgSrc: require("@/assets/images/order.png"),
          text: "总订单",
          number: 102400
        },
        {
          imgSrc: require("@/assets/images/sales-volume.png"),
          text: "总销售额",
          number: 102400
        },
        {
          imgSrc: require("@/assets/images/order-num.png"),
          text: "今日订单数",
          number: 102400
        },
        {
          imgSrc: require("@/assets/images/today-sales-volume.png"),
          text: "今日销售额",
          number: 102400
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.Statistics {
  padding: 20px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    flex: 0 0 100px;
    margin-bottom: 50px;
    justify-content: space-between;
    .item {
      height: 100px;
      width: 264px;
      padding: 20px 50px;
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      > .img {
        height: 100%;
        margin-right: 20px;
      }
      .sales-data {
        height: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .text {
          color: #ccc;
        }
      }
    }
  }
  .statistical-curve {
    flex: 1;
    // overflow: auto;
  }
}
</style>