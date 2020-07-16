<template>
  <div class="Statistics">
    <div class="top">
      <el-row :gutter="20">
        <el-col :span="6" v-for="i in Item" :key="i.title">
          <Card :cardData="i" />
        </el-col>
      </el-row>
    </div>
    <div class="statistical-curve">
      <LineEcharts :options="options" />
    </div>
  </div>
</template>

<script>
// Echarts
import Card from "@/components/card/Card.vue";
import LineEcharts from "@/components/lineEcharts/LineEcharts.vue";
import { getChartData } from "@/api/order";
export default {
  components: {
    LineEcharts,
    Card
  },
  data() {
    return {
      // 卡片数据
      Item: [
        {
          imgUrl: require("@/assets/images/order.png"),
          title: "总订单",
          count: ""
        },
        {
          imgUrl: require("@/assets/images/sales-volume.png"),
          title: "总销售额",
          count: ""
        },
        {
          imgUrl: require("@/assets/images/order-num.png"),
          title: "今日订单数",
          count: ""
        },
        {
          imgUrl: require("@/assets/images/today-sales-volume.png"),
          title: "今日销售额",
          count: ""
        }
      ],

      options: {
        title: "数据统计",
        lengend: ["订单", "销售额"],
        xAxisData: [],
        series: []
      }
    };
  },
  // 挂载后
  async mounted() {
    let {
      // 总订单
      totalOrder,
      // 总销售额
      totalAmount,
      // 今日订单
      todayOrder,
      // 今日销售额
      totayAmount,
      // x轴数据
      xData,
      // 订单数据
      orderData,
      // 金额数据
      amountData
    } = await getChartData(); //发送请求获取数据
    // 赋值渲染
    let arr = [totalOrder, totalAmount, todayOrder, totayAmount];
    // 处理卡片数据
    arr.forEach((v, i) => (this.Item[i].count = v));
    // x轴数据
    this.options.xAxisData = xData;

    // 今日销售额   今日订单
    this.options.series = [
      {
        name: "订单",
        type: "line",
        data: orderData
      },
      {
        name: "销售额",
        type: "line",
        data: amountData
      }
    ];
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