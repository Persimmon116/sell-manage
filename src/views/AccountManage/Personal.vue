<template>
  <div class="personal">
    <div class="container">
      <p class="title">管理员信息</p>
      <p class="user-id">
        管理员ID:
        <span>{{id}}</span>
      </p>
      <p class="user-id">
        账号:
        <span>{{account}}</span>
      </p>
      <p class="user-id">
        用户组:
        <span>{{userGroup}}</span>
      </p>
      <p class="user-id">
        创建时间:
        <span>{{time}}</span>
      </p>
      <div class="portrait-box">
        <span>管理员头像:</span>
        <img class="portrait" :src="imgSrc" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 123,
      account: "小凋残",
      userGroup: "用户组1",
      time: "2020/07/07",
      imgSrc: require("@/assets/images/elm.png")
    };
  }
};
</script>

<style lang="less" scoped>
.personal {
  padding: 0 20px;
  box-sizing: border-box;
  .container {
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
    p {
      font-size: 16px;
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
    }
    .title {
      font-weight: 700;
    }
    .portrait-box {
      display: flex;
      > span {
        align-self: center;
        margin-right: 10px;
        font-size: 16px;
      }
      .portrait {
        height: 60px;
        width: 60px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  /deep/.el-table {
    padding-left: 10px;
  }
}
</style>