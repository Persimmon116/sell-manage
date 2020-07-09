<template>
  <div class="header">
    <!-- <span v-for="(v,i) in routerList" :key="i">
          {{v}}
          <span v-if="i!=routerList.length-1 ">></span>
    </span>-->
    <div class="router">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '#/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>2
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="info">
      <p class="username">
        欢迎你，
        <span>小凋残</span>
      </p>
      <img src="@/assets/images/elm.png" alt />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
//路由导航
.header {
  background-color: #fff;
  margin-bottom: 20px;
  color: #000;
  padding: 0 30px;
  box-sizing: border-box;
  display: flex;
  flex: 0 0 60px;
  .router {
    flex: 1;
    .el-breadcrumb {
      line-height: 60px;
    }
  }
  .info {
    flex: 0 0 210px;
    line-height: 60px;
    display: flex;
    .username {
      flex: 1;
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