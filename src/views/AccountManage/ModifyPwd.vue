<template>
  <div class="modifypwd">
    <h1 class="modifypwd-title">修改密码</h1>
    <div class="modifypwd-container">
      <el-form
        :model="resetForm"
        size="small "
        status-icon
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="password">
          <el-input
            type="password"
            v-model="resetForm.password"
            autocomplete="off"
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpassword">
          <el-input
            type="password"
            v-model="resetForm.newpassword"
            autocomplete="off"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmnewpwd">
          <el-input
            type="password"
            v-model="resetForm.confirmnewpwd"
            autocomplete="off"
            placeholder="请再次输入新密码"
          ></el-input>
        </el-form-item>
        <div class="sub-reset-btn">
          <el-button size="mini" type="primary">提交</el-button>
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
      //修改密码
      resetForm: {
        //原密码
        password: "",
        //新密码
        newpassword: "",
        //确认新密码
        confirmnewpwd: ""
      }
    };
  }
};
</script>

<style lang="less" scoped>
.modifypwd {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 20px;
  .modifypwd-title {
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    border-bottom: 1px solid #f1f1f1;
  }
  .modifypwd-container {
    margin-left: 10px;
    width: 350px;
    .sub-reset-btn {
      // margin-left: 10px;
      width: 150px;
      margin: 0 auto;
    }
  }
}
</style>