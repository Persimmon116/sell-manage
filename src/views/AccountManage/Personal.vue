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
// 引入axios
import { getUserInfo } from "@/api/account";
// 引入处理时间格式
import moment from "moment";

import local from "@/utils/local";
export default {
  data() {
    return {
      id: "",
      account: "",
      userGroup: "",
      time: "",
      imgSrc: ""
    };
  },
  async created() {
    let info1 = await getUserInfo();
    let info = { ...info1.accountInfo };
    this.id = info.id;
    this.account = info.account;
    this.userGroup = info.userGroup;
    // 时间处理
    info.ctime = moment(info.ctime).format("YYYY-MM-DD hh:mm:ss");
    this.time = info.ctime;
    this.imgSrc = info.imgUrl;
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