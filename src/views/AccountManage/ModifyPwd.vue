<template>
  <Panel class="modifypwd">
    <span slot="title" class="modifypwd-title">修改密码</span>
    <div slot="content" class="modifypwd-container">
      <el-form
        :model="resetForm"
        :rules="rules"
        size="small "
        ref="resetForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 原密码 -->
        <el-form-item label="原密码" prop="oldPassword">
          <el-input
            type="password"
            v-model="resetForm.oldPassword"
            autocomplete="off"
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>

        <!-- 新密码 -->
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            type="text"
            v-model="resetForm.newPassword"
            autocomplete="off"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>

        <!-- 确认新密码 -->
        <el-form-item label="确认新密码" prop="confirmnewPwd">
          <el-input
            type="text"
            v-model="resetForm.confirmnewPwd"
            autocomplete="off"
            placeholder="请再次输入新密码"
            @change.native.enter="submitForm"
          ></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <div class="sub-reset-btn">
          <el-button size="mini" type="primary" @click="submitForm">提交</el-button>
          <el-button size="mini" @click="resForm">重置</el-button>
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
// 引入axios
import { checkOldPwd, editPwd } from "@/api/account";
// 引入本地存储
import local from "@/utils/local";
export default {
  components: {
    Panel
  },

  data() {
    // 返回对象前定义函数
    const oldPassword = (rule, val, callback) => {
      // 判断是否为空
      if (!val) {
        callback(new Error("请输入原密码"));
      } else {
        callback();
      }
    };
    const newPassword = (rule, val, callback) => {
      // 判断是否为空
      if (!val) {
        callback(new Error("请输入新密码"));
        // 判断两次是否一致
      } else if (!PwdReg.test(val)) {
        callback(new Error("最少4位，包括至少一位小写字母，一个数字"));
        // 成功
      } else {
        // 反向验证
        if (this.confirmnewPwd !== "") {
          this.$refs.resetForm.validateField("confirmnewPwd");
        }
        callback();
      }
    };
    const confirmnewPwd = (rule, val, callback) => {
      // 判断是否为空
      if (!val) {
        callback(new Error("请再次输入新密码"));
        // 判断两次是否一致
      } else if (val !== this.resetForm.newPassword) {
        callback(new Error("两次密码不一致"));
        // 成功
      } else {
        callback();
      }
    };
    return {
      //修改密码
      resetForm: {
        //原密码
        oldPassword: "",
        //新密码
        newPassword: "",
        //确认新密码
        confirmnewPwd: ""
      },
      rules: {
        //原密码
        oldPassword: {
          required: true,
          validator: oldPassword,
          trigger: "blur"
        },
        //新密码
        newPassword: {
          required: true,
          validator: newPassword,
          trigger: "blur"
        },
        // 确认新密码
        confirmnewPwd: {
          required: true,
          validator: confirmnewPwd,
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.resetForm.validate(async valid => {
        if (valid) {
          // 发送验证原密码请求
          let { code } = await checkOldPwd({
            oldPwd: this.resetForm.oldPassword
          });
          // 成功
          if (code == "00") {
            // 判断新密码和旧密码重复不重复
            if (
              this.resetForm.newPassword == this.resetForm.oldPassword &&
              this.resetForm.newPassword !== ""
            ) {
              // 如果重复，弹框提示
              this.$message.error("新密码不能和原密码一致哦亲");
              return;
            }
            // 发送修改密码请求
            let { code } = await editPwd({
              newPwd: this.resetForm.newPassword
            });
            // 成功
            if (code == "0") {
              // 清除本地存储
              local.clear();
              // 跳转到登录页面
              this.$router.push("/logon");
            }
            // 失败
          } else if (code == "11") {
            this.$message.error("原密码不正确");
            return;
          }
          // 失败
        } else {
          return false;
        }
      });
    },
    resForm() {
      this.$refs.resetForm.resetFields();
    }
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