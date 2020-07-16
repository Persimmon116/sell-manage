<template>
  <div class="goodstatistics">
    <div class="time">
      <el-form label-width="70px" class="date">
        <el-form-item style="font-weight: 700;" label="时间范围">
          <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>

      <el-button type="primary" size="mini" @click="query">查询</el-button>
    </div>
    <div class="GoodStatisticsEcharts">
      <LineEcharts :options="options" />
    </div>
  </div>
</template>

<script>
//引入Echarts
import LineEcharts from "@/components/lineEcharts/LineEcharts.vue";
import { getGoodsTotal } from "@/api/order";
import moment from "moment";

export default {
  components: {
    LineEcharts
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
      options: {
        title: "商品统计",
        lengend: ["订单金额"],
        xAxisData: [],
        series: []
      },
      date: []
    };
  },
  methods: {
    // 获取
    async getGoodsTotal() {
      this.date = this.date.map(v => moment(v).format("YYYY-MM-DD HH:mm:ss"));
      // 发送请求
      let { data } = await getGoodsTotal({
        date: this.date == null ? JSON.stringify([]) : JSON.stringify(this.date)
      });
      // 处理参数 赋值渲染
      this.options.xAxisData = data.map(v =>
        moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss")
      );
      this.options.series = [
        {
          name: "订单金额",
          type: "line",
          data: data.map(v => v.orderAmount)
        }
      ];
    },
    // 查询
    query() {
      this.getGoodsTotal();
    }
  },
  // 挂载后
  mounted() {
    // 调用获取
    this.getGoodsTotal();
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
    margin-bottom: 25px;
    .date {
      margin-right: 10px;
    }
    /deep/.el-button {
      align-self: center;
      width: 60px;
      height: 36px;
    }
  }
}
</style>