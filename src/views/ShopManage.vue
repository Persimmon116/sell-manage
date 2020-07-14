<template>
  <Panel class="shop-manage">
    <span class="shop-manage-title" slot="title">
      <span>店铺管理</span>
      <el-button
        @click="handleEdit"
        :type="isEdit ? 'success' : 'primary'"
        size="mini"
      >{{ isEdit ? '保存' : '编辑' }}</el-button>
    </span>
    <div slot="content" class="shop-manage-content">
      <el-form
        :model="shopForm"
        :disabled="!isEdit"
        size="small"
        label-width="70px"
        style="width:420px"
      >
        <el-form-item label="店铺名称">
          <el-input v-model="shopForm.name"></el-input>
        </el-form-item>

        <el-form-item label="店铺公告">
          <el-input v-model="shopForm.bulletin" rows="6" type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/shop/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="shopForm.avatar" :src="shopForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="店铺图片">
          <el-upload
            :file-list="shopForm.pics"
            action="http://127.0.0.1:5000/shop/upload"
            list-type="picture-card"
            :on-success="handleImgSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <el-form-item label="配送费">
          <el-input v-model="shopForm.deliveryPrice"></el-input>
        </el-form-item>

        <el-form-item label="配送时间">
          <el-input v-model="shopForm.deliveryTime"></el-input>
        </el-form-item>

        <el-form-item label="配送描述">
          <el-input v-model="shopForm.description"></el-input>
        </el-form-item>

        <el-form-item label="店铺评分">
          <el-input v-model="shopForm.score"></el-input>
        </el-form-item>

        <el-form-item label="销量">
          <el-input v-model="shopForm.sellCount"></el-input>
        </el-form-item>

        <el-form-item label="活动">
          <el-checkbox-group v-model="shopForm.supports">
            <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
            <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
            <el-checkbox label="多人精彩套餐" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker
            v-model="shopForm.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>
      </el-form>
    </div>
  </Panel>
</template>

<script>
import Panel from "@/components/panel/Panel.vue";
import { getShopInfo, shopContentEdit } from "@/api/shop";

export default {
  components: {
    Panel
  },
  data() {
    return {
      // 模态框图片
      dialogImageUrl: "",
      // 模态框
      dialogVisible: false,
      // 是否修改
      isEdit: false,
      // 店铺表单
      shopForm: {
        id: 1,
        name: "",
        bulletin: "",
        avatar: "",
        pics: [],
        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: "",
        sellCount: "",
        supports: [],
        date: []
      },
      // 图片目录
      baseImgUrl: "http://127.0.0.1:5000/upload/shop/"
    };
  },
  methods: {
    // 编辑
    async handleEdit() {
      this.isEdit = !this.isEdit;
      // console.log(this.isEdit);
      // 点击完成发送请求，处理参数格式
      if (!this.isEdit) {
        // 定义变量保存处理好的图片地址
        let arr = this.shopForm.pics.map(v =>
          // 截取字符串 从图片目录字符串长度开始截取后面的
          v.url.substr(this.baseImgUrl.length)
        );
        // 修改ajax   处理参数
        let ajax = {
          id: 1,
          name: this.shopForm.name,
          bulletin: this.shopForm.bulletin,
          // 将商店头像截取
          avatar: this.shopForm.avatar.substr(this.baseImgUrl.length),
          deliveryPrice: this.shopForm.deliveryPrice,
          deliveryTime: this.shopForm.deliveryTime,
          description: this.shopForm.description,
          score: this.shopForm.score,
          sellCount: this.shopForm.sellCount,
          // 将活动类型转为字符串
          supports: JSON.stringify(this.shopForm.supports),
          // 将营业时间转为字符串
          date: JSON.stringify(this.shopForm.date),
          // 将图片地址转为字符串
          pics: JSON.stringify(arr)
        };
        // 发送请求
        await shopContentEdit(ajax);
      }
    },
    // 头像上传成功后
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      // console.log(res);
      if (code === 0) {
        // 弹框
        this.$message({ type: "success", message: msg });
        // 处理上传头像
        this.shopForm.avatar = this.baseImgUrl + imgUrl;
      }
    },
    // 头像上传前限制
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
    // 上传店铺图片成功后
    handleImgSuccess(res) {
      // 添加图片
      this.shopForm.pics.push({
        url: this.baseImgUrl + res.imgUrl
      });
    },
    // 删除图片
    handleRemove(file) {
      // 遍历店铺图片
      this.shopForm.pics.forEach((v, i) => {
        // console.log(v);
        // console.log(i);
        // 如果商品图片和当前的图片uid一致，则删除
        if (v.uid === file.uid) {
          // 通过索引删除;
          this.shopForm.pics.splice(i, 1);
        }
      });
    },

    // 店铺图片模态框
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url; //将img地址赋值给模态框的img
      this.dialogVisible = true; //模态框状态
    },
    // 获取
    async getShopInfo() {
      // 发送请求
      let { data } = await getShopInfo(this.shopForm);
      // 赋值渲染
      this.shopForm = data;
      // 处理商店图片
      data.pics = data.pics.map(v => ({
        url: this.baseImgUrl + v
      }));
      // 处理商品头像
      data.avatar = this.baseImgUrl + data.avatar;
    }
  },
  // 加载完成后
  created() {
    // 获取店铺信息
    this.getShopInfo();
  }
};
</script>

<style lang="less" scoped>
.shop-manage {
  padding: 20px;
  margin: 0 20px;
  .shop-manage-title {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 700;
    > span {
      flex: 0 0 120px;
    }
  }
  .shop-manage-content {
    margin-left: 10px;
  }
}
/deep/.avatar-uploader .el-upload {
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