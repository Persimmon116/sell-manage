<template>
  <div class="err" :style="note">
    <el-button type="info" class="btn" @click="backSpace">返回首页</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: require("@/assets/images/err.jpg"),
      note: {
        backgroundImage: "url(" + require("@/assets/images/err.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      }
    };
  },
  methods: {
    backSpace() {
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="less" scoped>
.err {
  width: 100%;
  height: 100%;
  .btn {
    position: absolute;
    bottom: 40%;
    left: 48%;
  }
}
</style>