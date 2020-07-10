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
        <el-dropdown>
          <span class="el-dropdown-link">
            欢迎你，小貂蝉
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 头像 -->
        <el-avatar size="medium" :src="avatar"></el-avatar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 头像
      avatar:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
          console.log(arr);
        }
        this.crumbsArr = arr;
      });
    }
  },
  created() {
    this.crumbs();
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