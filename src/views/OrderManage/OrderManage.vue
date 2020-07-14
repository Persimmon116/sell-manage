<template>
  <div class="order-manage">
    <div class="content">
      <div class="order-manage-top">
        <el-form :inline="true" :data="queryForm">
          <el-form-item label="订单号" label-width="100" style="width:260px">
            <el-input size="mini" v-model="queryForm.orderNo" placeholder="订单号"></el-input>
          </el-form-item>

          <el-form-item label="收货人" label-width="100" style="width:260px">
            <el-input size="mini " v-model="queryForm.consignee" placeholder="收货人"></el-input>
          </el-form-item>

          <el-form-item label="手机号" label-width="100">
            <el-input size="mini" v-model="queryForm.phone" placeholder="手机号"></el-input>
          </el-form-item>

          <el-form-item
            style="margin-top: 6px;"
            class="select"
            label="订单状态"
            size="mini"
            label-width="120"
          >
            <el-select v-model="queryForm.orderState" placeholder="请选择">
              <el-option value="已完成">已完成</el-option>
              <el-option value="派送中">派送中</el-option>
              <el-option value="已受理">已受理</el-option>
            </el-select>
          </el-form-item>
          <el-date-picker
            format="yyyy-MM-dd HH:mm:ss"
            v-model="queryForm.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="date"
          ></el-date-picker>
          <el-form-item>
            <el-button type="primary" @click="query" size="medium">查询</el-button>
            <el-button type="success" @click="reset" size="medium">重置</el-button>
          </el-form-item>
        </el-form>

        <div></div>
      </div>
      <div>
        <el-table :data="tableData" border>
          <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
          <el-table-column prop="orderTime" label="下单时间" width="160"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址" width="120"></el-table-column>
          <el-table-column prop="deliveryTime" label="送达时间" width="160"></el-table-column>
          <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="see(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="editOrder(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          style="margin-top: 30px;"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑模态框 -->
    <el-dialog title="查看订单" :visible.sync="dialogVisible" width="360px">
      <!-- 编辑表单 -->
      <el-form :model="seeForm" style="width: 275px;" size="mini" label-width="60px">
        <el-form-item label="订单号" label-width="70px">
          <el-input readonly v-model="seeForm.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="下单时间" label-width="70px">
          <el-input readonly v-model="seeForm.orderTime"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="70px">
          <el-input readonly v-model="seeForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="收货人" label-width="70px">
          <el-input readonly v-model="seeForm.consignee"></el-input>
        </el-form-item>
        <el-form-item label="配送地址" label-width="70px">
          <el-input readonly v-model="seeForm.deliverAddress"></el-input>
        </el-form-item>
        <el-form-item label="送达时间" label-width="70px">
          <el-input readonly v-model="seeForm.deliveryTime"></el-input>
        </el-form-item>
        <el-form-item label="用户备注" label-width="70px">
          <el-input readonly v-model="seeForm.remarks"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" label-width="70px">
          <el-input readonly v-model="seeForm.orderAmount"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" label-width="70px">
          <el-input readonly v-model="seeForm.orderState"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderList } from "@/api/order";
import moment from "moment";
import local from "@/utils/local";

export default {
  data() {
    return {
      // 表单数据
      queryForm: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: JSON.stringify([])
      },
      // 查看详情表单
      seeForm: {},
      //模态框状态
      dialogVisible: false,
      currentPage: 1, // 当前页
      pageSize: 4, // 每页条数
      total: 0, // 总条数
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
      // 表格数据
      tableData: []
    };
  },
  methods: {
    handleClick(row) {},
    // 获取去订单列表
    async getOrderList() {
      let { total, data } = await getOrderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.queryForm.orderNo,
        consignee: this.queryForm.consignee,
        phone: this.queryForm.phone,
        orderState: this.queryForm.orderState,
        date: this.queryForm.date
      });
      // 处理ctime时间格式
      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
        v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
      });
      // 渲染
      this.tableData = data;
      this.total = total;
    },
    // 当前页改变
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getOrderList();
    },
    // 查询
    query() {
      // 从第一页显示;
      this.currentPage = 1;
      // 查询
      this.getOrderList();
    },
    // 重置
    reset() {
      // 清空表单
      this.queryForm = {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: JSON.stringify([])
      };
      // 从第一页显示;
      this.currentPage = 1;
      this.getOrderList();
    },
    // 查看
    see(row) {
      // 显示模态框
      this.dialogVisible = true;
      // 数据回填   展开生成新对象
      this.seeForm = { ...row };
    },
    // 编辑
    editOrder(row) {
      // 把数据放入本地存储
      local.set("row", row);
      // 跳转到修改页面
      this.$router.push("/order/order-edit");
    }
  },
  created() {
    this.getOrderList();
  },
  computed: {
    // 计算宽度
    computedWidth() {
      return {
        width: document.body.clientWidth - 290 + "px"
      };
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
        margin-right: 10px;
      }
    }
  }
}
</style>