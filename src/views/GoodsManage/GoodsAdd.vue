<template>
  <Panel class="goods-add">
    <span class="goods-add-title" slot="title">商品添加</span>
    <div class="goods-add-content" slot="content">
      <el-form>
        <el-form-item label="商品名称" label-width="100px">
          <el-input placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" label-width="100px">
          <el-select v-model="goodsSort.sort" placeholder="请选择商品分类">
            <el-option label="水果" value="水果"></el-option>
            <el-option label="小吃" value="小吃"></el-option>
            <el-option label="零食" value="零食"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" label-width="100px">
          <el-input-number v-model="num" @change="handleChange" :min="min" :max="max"></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片" label-width="100px">
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
        </el-form-item>
        <el-form-item label="商品描述" label-width="100px">
          <el-input type="textarea" :rows="2" placeholder="请输入商品描述" v-model="textarea"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button size="small" type="primary">添加商品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Panel>
</template>

<script>
import Panel from "@/components/panel/Panel.vue";
export default {
  components: {
    Panel
  },
  data() {
    return {
      goodsSort: {
        sort: ""
      },
      // 商品价格初始值
      num: 1,
      // 商品价格最小值
      min: 1,
      // 商品价格最大值
      max: 200,
      // 商品图片
      imageUrl: "",
      // 商品描述
      textarea: ""
    };
  },
  methods: {
    handleChange(value) {
      // console.log(value);
    },
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
<style>
.avatar-uploader .el-upload {
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
</style>
<style lang="less" scoped>
.goods-add {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 20px;
  .goods-add-title {
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .goods-add-content {
    margin-left: 10px;
    width: 450px;
  }
}
</style>