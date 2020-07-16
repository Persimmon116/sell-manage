<template>
  <div
    :style="{ backgroundColor:'#fff', height: '400px',padding:'20px'}"
    id="myCharts"
    ref="myCharts"
  ></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    options: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    //   封装线图函数
    drawLine(options) {
      const myCharts = this.$echarts.init(this.$refs.myCharts);
      let option = {
        //   标题
        title: {
          text: options.title
        },
        // 工具提示
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        // 图例
        legend: {
          data: options.lengend
        },
        // 网格
        grid: {
          left: "5%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        // 工具盒子
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        // x轴
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: options.xAxisData
        },
        // y轴
        yAxis: {
          type: "value"
        },
        // 核心数据
        series: options.series
      };
      //   绘制图表
      myCharts.setOption(option);
    }
  },
  mounted() {
    // 调用绘制线图
    this.drawLine(this.options);
  },
  // 侦听器
  watch: {
    // 侦听options
    options: {
      // 发生改变触发函数
      handler(newVal, oldVal) {
        // 重新调用赋值渲染
        this.drawLine(newVal);
      },
      // 深度侦听
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
</style>