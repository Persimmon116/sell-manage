<template>
  <div class="Statistics">
    <div class="top">
      <!-- <div class="item" v-for="(v,i) in Item" :key="i">
        <div class="img">
          <img :src="v.imgSrc" alt />
        </div>
        <div class="sales-data">
          <p class="text">{{v.text}}</p>
          <p class="num">{{v.number}}</p>
        </div>
      </div>-->
      <el-row :gutter="20">
        <el-col :span="6" v-for="i in Item" :key="i.title">
          <Card :cardData="i" />
        </el-col>
      </el-row>
    </div>
    <div class="statistical-curve">
      <Echarts />
    </div>
  </div>
</template>

<script>
// Echarts
import Card from "@/components/card/Card.vue";
import Echarts from "./Echarts.vue";
export default {
  components: {
    Echarts,
    Card
  },
  data() {
    return {
      Item: [
        {
          imgUrl: require("@/assets/images/order.png"),
          title: "总订单",
          count: 102400
        },
        {
          imgUrl: require("@/assets/images/sales-volume.png"),
          title: "总销售额",
          count: 102400
        },
        {
          imgUrl: require("@/assets/images/order-num.png"),
          title: "今日订单数",
          count: 102400
        },
        {
          imgUrl: require("@/assets/images/today-sales-volume.png"),
          title: "今日销售额",
          count: 102400
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
    margin-bottom: 50px;
  }
  .statistical-curve {
    flex: 1;
  }
}
</style>