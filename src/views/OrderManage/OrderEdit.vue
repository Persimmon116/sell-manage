<template>
  <Panel class="order-edit">
    <span slot="title" class="order-edit-title">编辑订单</span>
    <div slot="content" class="order-edit-content">
      <el-form :data="editForm" size="small" style="width:400px">
        <!-- 订单号 -->
        <el-form-item label="订单号" label-width="70px">
          <el-input v-model="editForm.orderNo"></el-input>
        </el-form-item>
        <!-- 下单时间 -->
        <el-form-item label="下单时间" label-width="70px">
          <el-date-picker v-model="editForm.orderTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item label="手机号" label-width="70px">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <!-- 收货人 -->
        <el-form-item label="收货人" label-width="70px">
          <el-input v-model="editForm.consignee"></el-input>
        </el-form-item>
        <!-- 送货地址 -->
        <el-form-item label="配送地址" label-width="70px">
          <el-input v-model="editForm.deliverAddress"></el-input>
        </el-form-item>
        <!-- 送达时间 -->
        <el-form-item label="送达时间" label-width="70px">
          <el-date-picker v-model="editForm.deliveryTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <!-- 备注 -->
        <el-form-item label="用户备注" label-width="70px">
          <el-input v-model="editForm.remarks"></el-input>
        </el-form-item>
        <!-- 订单金额 -->
        <el-form-item label="订单金额" label-width="70px">
          <el-input v-model="editForm.orderAmount"></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态" label-width="70px">
          <el-select v-model="editForm.orderState">
            <el-option value="已完成">已完成</el-option>
            <el-option value="派送中">派送中</el-option>
            <el-option value="已受理">已受理</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="confirmEdit">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Panel>
</template>

<script>
import Panel from "@/components/panel/Panel.vue";
import local from "@/utils/local";
import { editOrder } from "@/api/order";
import moment from "moment";
export default {
  components: {
    Panel
  },
  data() {
    return {
      editForm: {
        orderNo: "1111",
        orderTime: "",
        phone: "",
        consignee: "",
        deliverAddress: "",
        deliveryTime: "",
        remarks: "",
        orderAmount: "",
        orderState: ""
      }
    };
  },
  methods: {
    //   确认修改
    async confirmEdit() {
      // 处理送达时间格式
      this.editForm.deliveryTime = moment(this.editForm.deliveryTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      // 处理下单时间格式
      this.editForm.orderTime = moment(this.editForm.orderTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      // 发送请求
      let { code } = await editOrder(this.editForm);
      if (code === 0) {
        //   跳转到订单列表
        this.$router.push("/order/order-manage");
        // 删除本地存储
        local.remove("row");
      }
    }
  },
  created() {
    //   本地存储拿值
    let row = local.get("row");
    // console.log(row);
    this.editForm = { ...row };
  }
};
</script>

<style lang="less" scoped>
.order-edit {
  padding: 20px;
  box-sizing: border-box;
  margin: 0 20px;
  .order-edit-title {
    font-size: 16px;
    font-weight: 700;
  }
  .order-edit-content {
    margin-left: 10px;
  }
}
</style>