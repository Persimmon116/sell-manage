<template>
  <div class="goodstatistics">
    <div class="time">
      <div class="block">
        <span class="demonstration">时间范围</span>
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </div>
      <el-button type="primary" size="mini">查询</el-button>
    </div>
    <div class="GoodStatisticsEcharts">
      <good-statistics-echarts />
    </div>
  </div>
</template>

<script>
//引入Echarts
import GoodStatisticsEcharts from "./GoodStatisticsEcharts.vue";
export default {
  components: {
    GoodStatisticsEcharts
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ""
    };
  }
};
</script>

<style lang="less" scoped>
.goodstatistics {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 20px;
  .time {
    display: flex;
    flex: 0 0 40px;
    margin-bottom: 40px;
    .block {
      height: 36px;
      margin-right: 10px;
      .demonstration {
        margin-right: 10px;
      }
    }
    /deep/.el-button {
      align-self: center;
      width: 60px;
      height: 36px;
    }
  }
  .GoodStatisticsEcharts {
    flex: 1;
    height: 100%;
  }
}
</style>