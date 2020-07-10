<template>
  <el-card class="box-card">
    <!-- 头部标题 -->
    <div slot="header" class="clearfix">
      <slot name="title" />
    </div>

    <!-- 主体内容 -->
    <slot name="content" />
  </el-card>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>