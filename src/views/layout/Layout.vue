<template>
  <div class="layout">
    <Nav />
    <div class="rightContent">
      <LayoutMenu />
      <div class="content">
        <!-- <Statistics /> -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// 引入主导航
import Nav from "./Nav.vue";
// 引入顶部导航
import LayoutMenu from "./LayoutMenu.vue";
// 引入数据统计
import Home from "../Home/Home.vue";
export default {
  components: {
    Nav,
    LayoutMenu,
    Home
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  display: flex;
  .rightContent {
    // width: 100%;
    flex: 1;
    background-color: #f0f2f5;

    display: flex;
    flex-direction: column;
    flex: 1;
    .content {
      flex: 1;
      width: 100%;
      height: 100%;
    }
  }
}
</style>