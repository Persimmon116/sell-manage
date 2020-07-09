<template>
  <div class="login">
    <div class="content">
      <h1>系统登陆</h1>
      <p>
        <!-- <el-button :plain="true" @click="open2">成功</el-button> -->
      </p>
      <p class="username">
        <el-input
          autofocus
          placeholder="请输入用户名"
          v-model="username"
          clearable
          prefix-icon="el-icon-user"
          @blur="checkUserName"
          @focus="checkUserNameMsg"
        ></el-input>
        <span class="userNameMsg">{{userNameMsg}}</span>
      </p>

      <p class="pwd">
        <el-input
          placeholder="请输入密码"
          v-model="pwd"
          prefix-icon="el-icon-lock"
          @blur="checkPwd"
          @focus="checkPassword"
          :type="type"
        ></el-input>
        <span class="yan" v-for="(v) in 2" :key="v">
          <img :src="send?nopen:open" @click="showHide" />
        </span>
        <span class="pwdMsg">{{pwdMsg}}</span>
      </p>
      <el-button class="submitBtn" type="primary" @click="submit" :plain="true">登陆</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用户名
      username: "",
      //密码
      pwd: "",
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
      nopen: require("@/assets/images/zhengyan.png")
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
    //获取焦点事件 验证密码
    checkUserNameMsg() {
      // 用户名提示信息
      this.userNameMsg = "最少4位，包括字母，数字，下划线，减号";
    },
    //失去焦点事件 验证用户名
    checkUserName() {
      // 定义变量保存正则表达式
      var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      // 判断用户名是否为空
      if (!this.username) {
        this.userNameMsg = "用户名不能为空";
        return;
        // 清空提示信息
      } else {
        this.userNameMsg = "";
      }
      // 判断用户名是否合法
      if (!uPattern.test(this.username)) {
        this.userNameMsg = "用户名不合法";
      }
    },
    //获取焦点事件 验证密码
    checkPassword() {
      // 密码提示信息
      this.pwdMsg =
        "最少6位，包括至少一位大写字母，一位小写字母，一个数字，一个特殊字符";
      // 如果type为text时
      if (this.type == "text") {
        // 保存正则
        var uPattern = /^[^\u4e00-\u9fa5]+$/;
        // 判断输入是否为中文;
        if (!uPattern.test(this.pwd)) {
          this.pwdMsg = "密码不能为中文";
        }
      }
    },
    //失去焦点事件 验证密码
    checkPwd() {
      // 定义变量保存正则
      var uPattern = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{6,}$/;
      // 判断密码是否为空
      if (!this.pwd) {
        this.pwdMsg = "密码不能为空";
        return;
        // 提示信息清空
      } else {
        this.pwdMsg = "";
      }
      // 判断密码是否合法
      if (!uPattern.test(this.pwd)) {
        this.pwdMsg = "密码不合法";
      } else {
        this.pwdMsg = "";
      }
    },
    // 提示框
    open2() {
      this.$message({
        message: "登陆成功",
        type: "success"
      });
    },
    //点击事件 登陆
    submit() {
      // 判断用户名密码是否为空
      if (!(this.pwd && this.username)) {
        alert("用户名或者密码不能为空");
        return;
        // 验证用户名密码格式
      } else if (this.pwdMsg || this.userNameMsg) {
        alert("用户名或密码不正确");
      } else {
        // 调用提示框
        this.open2();
        // 1s后跳转
        setTimeout(() => {
          // 跳转到首页
          location.href = "#/layout";
        }, 1000);
      }
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
    .submitBtn {
      width: 100%;
    }
  }
}
</style>