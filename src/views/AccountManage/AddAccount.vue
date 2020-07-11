<template>
  <Panel class="addaccount">
    <span slot="title" class="addaccount-title">添加账号</span>
    <div slot="content" class="addaccount-container">
      <el-form
        :model="addAccount"
        ref="addAccount"
        :rules="rules"
        size="small "
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 账号 -->
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="addAccount.account" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="addAccount.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <!-- 用户组 -->
        <el-form-item label="用户组" prop="userGroup">
          <el-select v-model="addAccount.userGroup" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>

        <!-- 按钮 -->
        <div class="add-reset-btn">
          <el-button size="mini" type="primary" @click="submitForm">添加</el-button>
          <el-button size="mini" @click="resetForm">重置</el-button>
        </div>
      </el-form>
    </div>
  </Panel>
</template>

<script>
// 面板组件
import Panel from "@/components/panel/Panel.vue";
// 引入正则
import { NameReg, PwdReg } from "@/utils/reg";
// 引入axios函数
import { addAccount } from "@/api/account";
export default {
  components: {
    Panel
  },
  data() {
    // 返回对象前定义函数
    const checkAcc = (rule, val, callback) => {
      // 判断是否为空
      if (!val) {
        callback(new Error("请输入您的账号"));
        // 判断是否通过
      } else if (!NameReg.test(val)) {
        callback(new Error("最少4位，包括字母，数字"));
        // 成功
      } else {
        callback();
      }
    };
    const checkPwd = (rule, val, callback) => {
      // 判断是否为空
      if (!val) {
        callback(new Error("请输入您的密码"));
        // 判断是否通过
      } else if (!NameReg.test(val)) {
        callback(new Error("最少4位，包括至少一位小写字母，一个数字"));
        // 成功
      } else {
        callback();
      }
    };
    return {
      //添加账号
      addAccount: {
        //账号
        account: "",
        //密码
        password: "",
        // 用户组
        userGroup: ""
      },
      rules: {
        //账号
        account: { required: true, validator: checkAcc, trigger: "blur" },
        //密码
        password: { required: true, validator: checkPwd, trigger: "blur" },
        // 用户组
        userGroup: {
          required: true,
          message: "请选择用户组",
          trigger: "change"
        }
      }
    };
  },

  methods: {
    // 提交
    submitForm() {
      this.$refs.addAccount.validate(async valid => {
        if (valid) {
          let { code } = await addAccount(this.addAccount);

          // 判断是否通过
          if (code === 0) {
            this.$router.push("/accountmanage/account-list");
          }
        } else {
          return false;
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs.addForm.resetFields();
    }
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