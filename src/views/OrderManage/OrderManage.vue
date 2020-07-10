<template>
  <div class="order-manage">
    <div class="content">
      <div class="order-manage-top">
        <el-row>
          <el-form>
            <el-col :span="5">
              <el-form-item label="订单号" label-width="100">
                <el-input size="mini" placeholder="订单号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="收货人" label-width="100">
                <el-input size="mini" placeholder="收货人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="手机号" label-width="100">
                <el-input size="mini" placeholder="手机号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                style="margin-top: 6px;"
                class="select"
                label="订单状态"
                size="mini"
                label-width="120"
              >
                <el-select v-model="value" placeholder="请选择">
                  <el-option value="1">1</el-option>
                  <el-option value="2">2</el-option>
                  <el-option value="3">3</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div>
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="date"
          ></el-date-picker>
          <el-button type="primary" size="medium">查询</el-button>
        </div>
      </div>
      <div class="middle">
        <el-table :data="tableData" border>
          <el-table-column prop="orderNum" label="订单号" width="120"></el-table-column>
          <el-table-column fixed prop="date" label="下单时间" width="150"></el-table-column>
          <el-table-column prop="tel" label="手机号" width="120"></el-table-column>
          <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
          <el-table-column prop="address" label="配送地址" width="300"></el-table-column>
          <el-table-column prop="serviceDate" label="送达时间" width="120"></el-table-column>
          <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
          <el-table-column prop="price" label="订单金额" width="120"></el-table-column>
          <el-table-column prop="state" label="订单状态" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
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
      value2: "",
      tableData: [
        {
          orderNum: "14214314",
          date: "2016-05-02",
          tel: 17584759867,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          serviceDate: "2020-07-07",
          remarks: "微辣",
          price: "100",
          state: "已受理"
        },
        {
          orderNum: "14214314",
          date: "2016-05-02",
          tel: 17584759867,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          serviceDate: "2020-07-07",
          remarks: "微辣",
          price: "100",
          state: "已受理"
        },
        {
          orderNum: "14214314",
          date: "2016-05-02",
          tel: 17584759867,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          serviceDate: "2020-07-07",
          remarks: "微辣",
          price: "100",
          state: "已受理"
        },
        {
          orderNum: "14214314",
          date: "2016-05-02",
          tel: 17584759867,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          serviceDate: "2020-07-07",
          remarks: "微辣",
          price: "100",
          state: "已受理"
        },
        {
          orderNum: "14214314",
          date: "2016-05-02",
          tel: 17584759867,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          serviceDate: "2020-07-07",
          remarks: "微辣",
          price: "100",
          state: "已受理"
        }
      ]
    };
  },
  methods: {
    handleClick(row) {
      // console.log(row);
    }
  }
};
</script>
<style>
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  /* margin-right: 10px; */
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
<style lang="less" scoped>
.order-manage {
  box-sizing: border-box;
  padding: 10px;
  .content {
    background-color: #fff;
    padding: 10px 20px;
    .order-manage-top {
      height: 100%;
      margin-bottom: 40px;
      .date {
        margin-right: 10px;
      }
      .el-form-item {
        display: flex;
        justify-content: space-between;

        /deep/.el-form-item__content {
          flex: 1;
          .el-input__inner {
            width: 160px;
          }
        }
      }
    }
    .middle {
      width: 1200px;
    }
  }
}
</style>