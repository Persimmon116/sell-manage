<template>
  <Panel class="goods-add">
    <span class="goods-add-title" slot="title">商品添加</span>
    <div class="goods-add-content" slot="content">
      <el-form>
        <el-form-item label="商品名称" label-width="100px">
          <el-input placeholder="请输入商品名称" v-model="goodsAddForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" label-width="100px">
          <el-select v-model="goodsAddForm.category">
            <el-option
              v-for="cate in categories"
              :key="cate.cateName"
              :value="cate.cateName"
            >{{ cate.cateName }}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品价格" label-width="100px">
          <el-input-number v-model="goodsAddForm.price" :min="1" :max="2000"></el-input-number>
        </el-form-item>

        <!-- 商品图片 -->
        <el-form-item label="商品图片" label-width="100px">
          <!-- 商品图片上传组件 -->
          <el-upload
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            class="avatar-uploader"
          >
            <img v-if="goodsAddForm.imgUrl" :src="imgBaseUrl + goodsAddForm.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品描述" label-width="100px">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入商品描述"
            v-model="goodsAddForm.goodsDesc"
          ></el-input>
        </el-form-item>

        <el-form-item label-width="100px">
          <el-button size="small" type="primary" @click="submitForm">添加商品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Panel>
</template>

<script>
import Panel from "@/components/panel/Panel.vue";
import { getCateName, addCate } from "@/api/goods";
export default {
  components: {
    Panel
  },
  data() {
    return {
      goodsSort: {
        sort: ""
      },
      // 添加商品表单
      goodsAddForm: {
        name: "",
        category: "",
        price: 0,
        imgUrl: "",
        goodsDesc: ""
      },
      // 商品分类名称
      categories: [],
      imgBaseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/"
    };
  },
  methods: {
    // 成功后
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({ type: "success", message: msg }); // 弹出成功提示
        this.goodsAddForm.imgUrl = imgUrl; // 回填图片
      }
    },
    // 上传前限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 提交商品添加
    async submitForm() {
      // 发送请求
      // let { code } = await addCate(this.goodsAddForm);
      let { code } = await addCate(this.goodsAddForm);
      console.log(code);
      if (code === 0) {
        // 跳转到商品列表
        this.$router.push("/goodsmanage/goods-list");
      }
    }
  },
  // 加载完成后
  async created() {
    // 发送ajax请求 获取所有分类名称
    let { categories } = await getCateName();
    this.categories = categories; // 赋值渲染
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
  }
  .goods-add-content {
    margin-left: 10px;
    width: 450px;
  }
}
</style>