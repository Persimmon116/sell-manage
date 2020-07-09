<template>
  <div
    :style="{width: '100%', backgroundColor:'#fff', height: '340px'}"
    id="myCharts"
    ref="myCharts"
  ></div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    // this.drawLine();
    const myCharts = this.$echarts.init(this.$refs.myCharts);
    let options = {
      title: {
        text: "数据统计"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["订单", "销售额", "注册人数", "管理人员"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "2019/10/18",
          "2019/10/18",
          "2019/10/18",
          "2019/10/18",
          "2019/10/18",
          "2019/10/18"
        ]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "订单",
          type: "line",
          data: [120, 132, 101, 134, 90, 230]
        },
        {
          name: "销售额",
          type: "line",
          stack: "总量",
          data: [1000, 1050, 800, 1700, 1200, 1200]
        },
        {
          name: "注册人数",
          type: "line",
          data: [150, 232, 201, 154, 190, 330]
        },
        {
          name: "管理人员",
          type: "line",
          data: [320, 332, 301, 334, 390, 330]
        }
      ]
    };
    myCharts.setOption(options);
  },
  methods: {
    drawLine() {
      // 绘制图表
      this.myChart.setOption({});
    }
  }
};
</script>

<style lang="less" scoped>
.myChart {
  padding: 35px;
  box-sizing: border-box;
}
</style>