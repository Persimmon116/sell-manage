<template>
  <div class="personal">
    <div class="container">
      <p class="title">管理员信息</p>
      <p class="user-id">
        管理员ID:
        <span>{{user.id}}</span>
      </p>
      <p class="user-id">
        账号:
        <span>{{user.account}}</span>
      </p>
      <p class="user-id">
        用户组:
        <span>{{user.userGroup}}</span>
      </p>
      <p class="user-id">
        创建时间:
        <span>{{user.ctime |filterCtime}}</span>
      </p>
      <div class="portrait-box">
        <span>管理员头像:</span>
      </div>
      <el-upload
        action="http://127.0.0.1:5000/users/avatar_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        class="avatar-uploader"
      >
        <img v-if="imgUrl" :src="imginitial + imgUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button @click="updateAvatar" size="mini" type="primary">修改头像</el-button>
    </div>
  </div>
</template>

<script>
// 引入axios
import { getUserInfo, editAvatar } from "@/api/account";
// 引入处理时间格式
import moment from "moment";

import local from "@/utils/local";
export default {
  data() {
    return {
      user: {},
      // 头像名字
      imgUrl: "",
      imginitial: "http://127.0.0.1:5000/upload/imgs/acc_img/" //服务器头像目录
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      // 获取数据
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        // 弹框提示
        this.$message({ type: "success", message: msg });
        // 渲染
        this.imgUrl = imgUrl;
      }
    },
    // 上传前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png"; //图片格式
      const isLt2M = file.size / 1024 / 1024 < 2; //图片大小

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async updateAvatar() {
      let { code } = await editAvatar({ imgUrl: this.imgUrl });
      if (code === 0) {
        this.$bus.$emit("updateAvatar");
      }
    }
  },
  filters: {
    filterCtime(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  created() {
    // 本地存储拿数据渲染
    this.user = local.get("info");
  }
};
</script>

<style lang="less" scoped>
/deep/.avatar-uploader .el-upload {
  margin-bottom: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
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
    > .el-button {
      margin-left: 20px;
    }
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
      margin-bottom: 20px;
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