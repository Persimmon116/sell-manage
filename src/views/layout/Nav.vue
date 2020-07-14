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
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">后台首页</span>
        </el-menu-item>
        <el-menu-item index="/order/order-manage">
          <i class="el-icon-document"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-shopping-bag-2"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/goodsmanage/goods-list">商品列表</el-menu-item>
          <el-menu-item index="/goodsmanage/goods-add">商品添加</el-menu-item>
          <el-menu-item index="/goodsmanage/goods-sort">商品分类</el-menu-item>
        </el-submenu>
        <el-menu-item index="/shopmanage">
          <i class="el-icon-s-shop"></i>
          <span slot="title">店铺管理</span>
        </el-menu-item>

        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>账号管理</span>
          </template>
          <el-menu-item index="/accountmanage/account-list">账号列表</el-menu-item>
          <el-menu-item index="/accountmanage/account-add">添加账号</el-menu-item>
          <el-menu-item index="/accountmanage/modify-pwd">修改密码</el-menu-item>
          <el-menu-item index="/accountmanage/personal">个人中心</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-s-data"></i>
            <span>销售统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/salestatistics/goods-tatistics">商品统计</el-menu-item>
            <el-menu-item index="/salestatistics/order-statistics">订单统计</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      titleImg: require("@/assets/images/elm.png"),
      routerList: ["首页", "账号管理", "添加账号"]
    };
  },
  //   方法
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  },
  //   计算属性
  computed: {
    curActive() {
      if (this.$route.path === "/order/order-edit")
        return "/order/order-manage";
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
      .el-menu-item {
        background-color: #304156 !important;
        a {
          text-decoration: none;
          display: inline-block;
          width: 100%;
          height: 100%;
          color: #fff;
          &.router-link-active {
            color: #409eff;
          }
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