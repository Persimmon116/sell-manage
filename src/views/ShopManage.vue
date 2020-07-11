<template>
  <div class="shop-manage">
    <div class="shop">
      <div class="header">
        <h1 class="title">店铺管理</h1>
        <el-button class="conserve-btn" size="mini" type="primary">保存</el-button>
      </div>
      <div class="form-content">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="店铺名称">
            <el-input size="medium" v-model="form.name" placeholder="请输入店铺名称"></el-input>
          </el-form-item>
          <el-form-item label="店铺公告">
            <el-input type="textarea" v-model="form.desc" placeholder="请输入店铺公告"></el-input>
          </el-form-item>
          <p class="shop-portrait">
            <span>店铺头像</span>
            <img src alt />
          </p>
          <div class="shop-img">
            <span>店铺照片</span>
            <p class="img">
              <img v-for="i in imgSrc" :key="i" :src="i" alt />
            </p>
          </div>
          <p class="plus">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </p>
          <el-form-item label="配送费">
            <el-input v-model="form.cost" placeholder="请输入配送费"></el-input>
          </el-form-item>
          <el-form-item label="配送时间">
            <el-input v-model="form.time" placeholder="请输入配送时间"></el-input>
          </el-form-item>
          <el-form-item label="配送描述">
            <el-input v-model="form.describe" placeholder="请输入配送描述"></el-input>
          </el-form-item>
          <el-form-item label="店铺评分">
            <el-input v-model="form.score" placeholder="请输入店铺评分"></el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="form.volume" placeholder="请输入销量"></el-input>
          </el-form-item>
          <el-form-item label="活动">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="在线支付满28减5"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
              <el-checkbox label="单人精彩套餐"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购"></el-checkbox>
              <el-checkbox label="单人特色套餐"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="营业时间">
            <el-time-picker
              is-range
              v-model="value1"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 上传图片
      imageUrl: "",
      // 复选框
      checkList: ["", "", "", "", ""],
      // 店铺图片
      imgSrc: [
        require("@/assets/images/elm.png"),
        require("@/assets/images/elm.png")
      ],
      // 营业时间
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      // 表单数据
      form: {
        name: "",
        time: 40,
        describe: "顺丰速递",
        score: "5.0",
        volume: "200",
        cost: 5,
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less" scoped>
.shop-manage {
  height: 100%;
  overflow-y: hidden;
  .shop {
    background-color: #fff;
    height: 100%;
    padding: 10px;
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: 10px;
      flex: 0 0 32px;
      .title {
        font-size: 16px;
        margin-bottom: 10px;
      }
      .conserve-btn {
        height: 30px;
        width: 50px;
      }
    }
    .form-content {
      // margin-bottom: 10px;
      padding: 0 5px;
      height: 100%;
      flex: 1;
      width: 100%;
      .el-form {
        height: 100%;
      }
      .shop-portrait {
        display: flex;
        margin-left: 10px;
        margin-top: 10px;
        margin-bottom: 30px;
        span {
          font-size: 14px;
          margin-top: 10px;
          margin-right: 15px;
        }
        img {
          height: 120px;
          width: 120px;
          border-radius: 5px;
          border: 1px solid #000;
        }
      }
      .shop-img {
        display: flex;
        margin-left: 10px;
        margin-top: 10px;
        margin-bottom: 40px;
        span {
          font-size: 14px;
          margin-top: 10px;
          margin-right: 15px;
        }
        .img {
          width: 300px;
          height: 100px;
          img {
            height: 120px;
            width: 120px;
            margin-right: 10px;
            border-radius: 5px;
            border: 1px solid #000;
          }
        }
      }
      .plus {
        height: 120px;
        width: 120px;
        margin-left: 80px;
        line-height: 120px;
        text-align: center;
        font-size: 28px;
        margin-bottom: 20px;
        .avatar-uploader:hover {
          border-color: #409eff;
        }
        .avatar-uploader {
          border: 1px dashed #d9d9d9;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
      /deep/.el-form-item__content {
        width: 360px;
      }
    }
  }
}
</style>