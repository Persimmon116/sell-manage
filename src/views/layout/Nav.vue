<template>
  <div class="home">
    <div class="nav">
      <div class="title">
        <img :src="titleImg" alt />
        <h2>外卖商家中心</h2>
      </div>
      <el-menu
        router
        :default-active="curActive"
        class="el-menu-vertical-demo"
        text-color="#fff"
        unique-opened
        background-color="#304156"
        @open="handleOpen"
        @close="handleClose"
      >
        <template v-for=" menu in nav">
          <el-menu-item
            v-if="menu.children && menu.children.length === 1 || menu.path =='/order'"
            :key="menu.path"
            :index="menu.children && menu.children.length && menu.children[0].path !== '' ? menu.children[0].path : menu.path"
          >
            <i :class="menu.meta.icon"></i>
            <span slot="title">{{menu.meta.title}}</span>
          </el-menu-item>

          <el-submenu v-else :index="menu.path" :key="menu.path">
            <template slot="title">
              <i :class="menu.meta.icon"></i>
              <span>{{menu.meta.title}}</span>
            </template>

            <el-menu-item v-for=" v in menu.children" :key="v.path" :index="v.path">{{v.meta.title}}</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import local from "@/utils/local";
export default {
  // 数据
  data() {
    return {
      titleImg: require("@/assets/images/elm.png"),
      // 导航栏
      nav: []
    };
  },
  // 加载完成后
  created() {
    // 从本地拿数据
    this.nav = local.get("nav");
    console.log(this.nav);
  },
  //   方法
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  },
  //   计算属性
  computed: {
    curActive() {
      if (this.$route.path === "/order/order-edit") {
        return "/order/order-manage";
      }
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  background-color: #304156;
  height: 100%;
  display: flex;
  flex-direction: column;
  .nav {
    user-select: none;
    width: 280px;
    height: 100%;
    background-color: #304156;
    .title {
      width: 100%;
      height: 80px;
      display: flex;
      padding: 10px 25px 0;
      box-sizing: border-box;
      img {
        width: 55px;
        height: 55px;
        margin-right: 10px;
      }
      h2 {
        font-size: 22px;
        line-height: 55px;
        color: #fff;
      }
    }
    .el-menu {
      border-right: 0px;
      .el-menu--inline {
        background-color: #304156 !important;
      }
      .el-menu-item-group__title {
        height: 0 !important;
        padding: 0;
      }
      /deep/.el-menu-item {
        background-color: #304156 !important;
        &:hover {
          background-color: rgb(38, 52, 69) !important;
        }
        a {
          text-decoration: none;
          display: inline-block;
          width: 100%;
          height: 100%;
          color: #fff;
        }
      }
      a {
        text-decoration: none;
        color: #fff;
      }
    }
  }
}
</style>