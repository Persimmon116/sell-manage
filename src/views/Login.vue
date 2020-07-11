<template>
  <div class="login">
    <div class="content">
      <h1>系统登陆</h1>
      <el-form :model="formData" :rules="rules" ref="formData">
        <p class="username">
          <el-form-item prop="account">
            <el-input
              autofocus
              autocomplete="off"
              placeholder="请输入用户名"
              v-model="formData.account"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <span class="userNameMsg">{{userNameMsg}}</span>
        </p>
        <p class="pwd">
          <el-form-item prop="password">
            <el-input
              :type="type"
              placeholder="请输入密码"
              v-model="formData.password"
              prefix-icon="el-icon-lock"
              @change.native.enter="submit"
            ></el-input>
          </el-form-item>
          <span class="yan" v-for="(v) in 2" :key="v">
            <img :src="send?nopen:open" @click="showHide" />
          </span>
          <span class="pwdMsg">{{pwdMsg}}</span>
        </p>
        <el-form-item>
          <el-button class="submitBtn" type="primary" @click="submit" :plain="true">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { PwdReg, NameReg, Chinese } from "@/utils/reg";
import local from "@/utils/local";
// 引入axios函数
import { checkLogin } from "@/api/account";
export default {
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
      } else if (this.type === "text") {
        if (!Chinese.test(val)) {
          callback(new Error("密码不能是中文"));
        }
        // 判断是否通过
      } else if (!PwdReg.test(val)) {
        callback(new Error("最少3位，包括至少一位小写字母，一个数字"));
        // 成功
      } else {
        callback();
      }
    };
    return {
      formData: {
        //用户名
        account: "",
        //密码
        password: ""
      },
      //用户名提示信息
      userNameMsg: "",
      //密码提示信息
      pwdMsg: "",
      // 类型
      type: "password",
      // 眼睛状态
      send: "",
      // 图片地址  睁眼
      open: require("@/assets/images/biyan.png"),
      // 图片地址  闭眼
      nopen: require("@/assets/images/zhengyan.png"),
      // 验证规则
      rules: {
        //账号
        account: { required: true, validator: checkAcc, trigger: "blur" },
        //密码
        password: { required: true, validator: checkPwd, trigger: "blur" }
      }
    };
  },
  methods: {
    // 改变眼睛状态
    showHide() {
      // 如果是password就变成text
      this.type = this.type === "password" ? "text" : "password";
      // 将状态取反
      this.send = !this.send;
    },
    //点击事件 登陆
    submit() {
      this.$refs.formData.validate(async valid => {
        if (valid) {
          // 发送登录请求
          let { code, role, token } = await checkLogin(this.formData);
          // 判断
          if (code === 0) {
            local.set("token", token); // 1. 把token存入本地
            // 1s后跳转
            setTimeout(() => {
              this.$router.push("/"); // 跳转到后台首页
            }, 1000);
          }
        } else {
          console.log("不可以提交");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  user-select: none;
  height: 100%;
  background-color: #2d3a4b;
  padding-top: 210px;
  box-sizing: border-box;
  .content {
    height: 300px;
    width: 500px;
    margin: auto;
    > h1 {
      color: #fff;
      text-align: center;
      font-size: 20px;
      margin-bottom: 40px;
    }
    .username {
      height: 40px;
      line-height: 40px;
      margin-bottom: 40px;
      position: relative;
      /deep/.el-input__inner {
        background-color: #283443;
        border: 1px solid #c6c9cc;
        color: #fff;
      }
      .userNameMsg {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: -35px;
        color: #f00;
        font-size: 12px;
      }
    }
    .pwd {
      background-color: #283443;
      height: 40px;
      line-height: 40px;
      margin-bottom: 40px;
      position: relative;
      /deep/.el-input__inner {
        background-color: #283443;
        border: 1px solid #c6c9cc;
        color: #fff;
      }
      .yan {
        display: inline-block;
        height: 16px;
        width: 22px;
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
        img {
          position: absolute;
          top: 5px;
          height: 100%;
          width: 100%;
        }
      }
      .pwdMsg {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: -35px;
        color: #f00;
        font-size: 12px;
      }
    }
    /deep/.el-button {
      color: #fff;
      width: 100%;
      background-color: #409eff;
      border: none;
    }
    .submitBtn {
      width: 100%;
    }
  }
}
</style>