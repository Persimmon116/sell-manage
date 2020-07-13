<template>
  <Panel class="goods-list">
    <span class="goods-list-title" slot="title">商品列表</span>
    <div class="goods-list-content" slot="content">
      <el-table class="table" :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <span>{{ props.row.imgUrl }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item class="goodsDesc" label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img width="50" height="50" :src="imgBaseUrl + scope.row.imgUrl" />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作" prop="operate">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="delGoods(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top: 30px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 3, 5, 10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 编辑模态框 -->
      <el-dialog title="修改商品" :visible.sync="dialogVisible" width="360px">
        <!-- 编辑表单 -->
        <el-form :model="goodsEditForm" style="width: 275px;" size="small" label-width="60px">
          <el-form-item label="商品名称" label-width="80px">
            <el-input v-model="goodsEditForm.name"></el-input>
          </el-form-item>

          <el-form-item label="商品分类" label-width="80px">
            <el-select v-model="goodsEditForm.category">
              <el-option
                v-for="cate in categories"
                :key="cate.cateName"
                :value="cate.cateName"
              >{{ cate.cateName }}</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品价格" label-width="80px">
            <el-input v-model="goodsEditForm.price"></el-input>
          </el-form-item>
          <!-- 商品图片 -->
          <el-form-item label="商品图片" label-width="80px">
            <!-- 商品图片上传组件 -->
            <el-upload
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
              class="avatar-uploader"
            >
              <img
                v-if="goodsEditForm.imgUrl"
                :src="imgBaseUrl + goodsEditForm.imgUrl"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品描述" label-width="80px">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入商品描述"
              v-model="goodsEditForm.goodsDesc"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </Panel>
</template>

<script>
// 面板组件
import Panel from "@/components/panel/Panel.vue";
import { getGoodsList, delGoods, editGoods, getCateName } from "@/api/goods";
import moment from "moment";
export default {
  components: {
    Panel
  },
  data() {
    return {
      currentPage: 1, // 当前页
      pageSize: 5, // 每页条数
      total: 0, // 总条数
      tableData: [],
      // 图片目录
      imgBaseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      //模态框状态
      dialogVisible: false,
      // 商品分类名称
      categories: [],
      // 表单数据
      goodsEditForm: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
        id: ""
      }
    };
  },
  methods: {
    // 编辑
    handleEdit(row) {
      // 显示编辑模态框
      this.dialogVisible = true;
      // 数据回填   展开生成新对象
      this.goodsEditForm = { ...row };
    },
    // 成功后
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({ type: "success", message: msg }); // 弹出成功提示
        this.goodsEditForm.imgUrl = imgUrl; // 回填图片
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

    // 提交修改
    async saveEdit() {
      let { code } = await editGoods(this.goodsEditForm);
      if (code === 0) {
        // 刷新列表
        this.fetchData();
        // 关闭模态框
        this.dialogVisible = false;
      }
    },

    // 删除
    delGoods(row) {
      this.$confirm("你确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 确认删除
        .then(async () => {
          // 删除
          let { code } = await delGoods({ id: row });
          if (code === 0) {
            // 重新获取数据刷新
            this.fetchData();
          }
        })
        // 取消
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 获取数据
    async fetchData() {
      let { total, data } = await getGoodsList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      console.log(data);
      // 处理ctime时间格式
      data.forEach(v => {
        v.ctime = moment(v.ctime).format("YYYY-MM-DD HH:mm:ss");
      });

      // 边界判断 如果当前页码没有数据了 且 当前页码不是第一页
      if (!data.length && this.currentPage !== 1) {
        this.currentPage -= 1; // 页码-1
        this.fetchData(); // 重新获取数据
      }

      // 赋值渲染
      this.total = total;
      this.tableData = data;
    },

    // 当前页改变
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData();
    },

    // 每页条数改变
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    }
  },
  // 加载完成后
  async created() {
    // 发送ajax请求 获取所有分类名称
    let { categories } = await getCateName();
    this.categories = categories; // 赋值渲染

    this.fetchData(); // 进入页面调用一次获取数据的方法
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
<style lang="less" scoped>
.goods-list {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 20px;
  .goods-list-title {
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    border-bottom: 1px solid #f1f1f1;
  }
  .goods-list-content {
    margin-left: 10px;
    .table {
      margin-bottom: 20px;
      /deep/.el-table__row {
        .cell {
          width: 150px;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>