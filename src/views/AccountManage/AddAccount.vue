<template>
  <div class="addaccount">
    <h1 class="addaccount-title">添加账号</h1>
    <div class="addaccount-container">
      <el-form :model="addForm" size="small " status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="addForm.account" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="newpassword">
          <el-input
            type="password"
            v-model="addForm.newpassword"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="addForm.region" placeholder="请选择用户组">
            <el-option label="用户组一" value="shanghai"></el-option>
            <el-option label="用户组二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <div class="add-reset-btn">
          <el-button size="mini" type="primary">添加</el-button>
          <el-button size="mini">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //添加账号
      addForm: {
        //账号
        account: "",
        //密码
        newpassword: "",
        //确认新密码
        confirmnewpwd: "",
        region: ""
      }
    };
  }
};
</script>

<style lang="less" scoped>
.addaccount {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 20px;
  .addaccount-title {
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    border-bottom: 1px solid #f1f1f1;
  }
  .addaccount-container {
    margin-left: 10px;
    width: 350px;
    /deep/.el-select--small {
      width: 250px;
    }
    .add-reset-btn {
      // margin-left: 10px;
      width: 150px;
      margin: 0 auto;
    }
  }
}
</style>