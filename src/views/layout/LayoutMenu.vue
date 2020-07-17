<template>
  <div class="header">
    <!-- <span v-for="(v,i) in routerList" :key="i">
          {{v}}
          <span v-if="i!=routerList.length-1 ">></span>
    </span>-->
    <el-row>
      <el-col :span="12">
        <div class="router">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="i in crumbsArr"
              :key="i.path"
              :to="{ path:i.path }"
            >{{i.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
      <el-col class="right-box" :span="12">
        <!-- 右侧 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎你，{{account}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal">个人中心</el-dropdown-item>
            <el-dropdown-item command="login">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 头像 -->
        <el-avatar size="medium" :src="imgUrl"></el-avatar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入本地存储
import local from "@/utils/local";
// 引入axios
import { getUserInfo } from "@/api/account";
export default {
  data() {
    return {
      // 头像
      imgUrl: "",
      // 用户名
      account: "",
      // 面包屑数组
      crumbsArr: []
    };
  },
  methods: {
    // 面包屑
    crumbs() {
      // 定义数组
      var arr = [{ title: "首页", path: "/home" }];
      // 遍历matched
      this.$route.matched.forEach(v => {
        // 判断mate有值且title有值
        if (v.meta && v.meta.title) {
          arr.push({
            title: v.meta.title,
            path: v.path
          });
        }
        this.crumbsArr = arr;
      });
    },
    // 退出登录  个人中心
    handleCommand(cmd) {
      // 如果cmd等于personal
      if (cmd == "personal") {
        // 跳转到个人中心
        this.$router.push("/accountmanage/personal");
      } else {
        // 弹框提示
        this.$message({ type: "success", message: "欢迎下次登录" });
        // 退出刷新页面
        location.reload();
        // 清除本地存储
        local.clear();
        // 跳转到登录页面
        this.$router.push("/login");
      }
    },
    // 获取头像 用户名
    async getUserInfo() {
      // 发送请求
      let info = await getUserInfo();
      // 渲染
      this.imgUrl = info.imgUrl;
      this.account = info.account;
      // 个人信息放入本地存储
      local.set("info", info);
    }
  },

  created() {
    // 调用面包屑
    this.crumbs();
    // 调用湖区用户信息
    this.getUserInfo();

    // 接收个人中心数据
    this.$bus.$on("updateAvatar", () => {
      this.getUserInfo();
    });
  },
  // 侦听器
  watch: {
    // 地址栏发生改变调用
    "$route.path"() {
      this.crumbs();
    }
  }
};
</script>

<style lang="less" scoped>
//路由导航
.header {
  background-color: #fff;
  margin-bottom: 20px;
  color: #000;
  padding: 0 30px;
  box-sizing: border-box;
  .router {
    .el-breadcrumb {
      line-height: 60px;
    }
  }
  .right-box {
    display: flex;
    justify-content: flex-end;
    height: 60px;
    .el-dropdown {
      align-self: center;
    }
    .el-avatar {
      margin-left: 10px;
      align-self: center;
    }
  }
  .info {
    line-height: 60px;
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    .username {
      span {
        display: inline-block;
        width: 60px;
        text-align: left;
      }
    }
    img {
      height: 55px;
      margin-top: 2px;
      width: 55px;
      border-radius: 50%;
    }
  }
}
</style>