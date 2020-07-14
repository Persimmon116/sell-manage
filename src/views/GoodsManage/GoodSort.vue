<template>
  <Panel class="goods-sort">
    <span class="goods-sort-title" slot="title" slot-scope="scope">
      <span>商品分类</span>
      <el-button type="primary" size="small" @click="addCate(scope.row)">添加分类</el-button>
    </span>
    <div class="goods-sort-content" slot="content">
      <el-table :data="tableData">
        <el-table-column type="index" label="序号" width="100"></el-table-column>

        <el-table-column prop="sort" label="分类名称" width="200">
          <template slot-scope="scope">
            <!-- 文字 不可编辑 -->
            <span v-if="!scope.row.isEdit">{{ scope.row.cateName }}</span>

            <!-- 输入框 可以编辑 -->
            <el-input v-else size="mini" v-model="scope.row.cateName" />
          </template>
        </el-table-column>

        <el-table-column prop="nable" label="是否启用" width="150">
          <template slot-scope="scope">
            <el-switch
              :disabled="scope.row.isEdit ? false : true"
              v-model="scope.row.state"
              active-color="#13ce66"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              @click="editCateList(scope.row)"
              size="mini"
              :type="scope.row.isEdit?'success':'primary'"
            >{{scope.row.isEdit?'完成':'编辑'}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 编辑模态框 -->
      <el-dialog title="修改分类" :visible.sync="dialogVisible" width="360px">
        <!-- 编辑表单 -->
        <el-form :model="editForm" style="width: 275px;" size="small" label-width="60px">
          <el-form-item label="分类名称" label-width="80px">
            <el-input v-model="editForm.cateName"></el-input>
          </el-form-item>

          <el-form-item label="分类状态" label-width="80px">
            <template>
              <el-switch v-model="editForm.state" active-color="#13ce66"></el-switch>
            </template>
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
import Panel from "@/components/panel/Panel.vue";
import { getCate, editCate, delCate, addCate } from "@/api/goods";
export default {
  components: {
    Panel
  },
  data() {
    return {
      currentPage: 1,
      // 每页条数
      pageSize: 5,
      // 总条数
      total: 0,
      tableData: [],
      //模态框状态
      dialogVisible: false,
      // 修改分类
      editForm: { cateName: "", state: "" }
    };
  },

  methods: {
    // 确定添加
    async saveEdit() {
      if (this.editForm.state === "") {
        this.editForm.state = true;
      }
      let { code } = await addCate({
        cateName: this.editForm.cateName,
        state: this.editForm.state
      });
      if (code === 0) {
        // 刷新列表
        this.obtainList();
        this.editForm = { cateName: "", state: "" };
        this.dialogVisible = false; // 关闭模态框
      }
    },

    // 添加分类
    addCate(row) {
      // 显示编辑模态框
      this.dialogVisible = true;
    },
    // 删除
    async handleDelete(row) {
      this.$confirm("你确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 确认删除
        .then(async () => {
          // 删除
          let { code } = await delCate({ id: row.id });
          if (code === 0) {
            // 重新获取数据刷新
            this.obtainList();
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
    // 编辑分类
    async editCateList(row) {
      // 编辑状态取反
      row.isEdit = !row.isEdit;
      if (!row.isEdit) {
        // 发送编辑请求
        let { code } = await editCate({
          id: row.id,
          cateName: row.cateName,
          state: row.state
        });
        if (code === 0) {
          this.obtainList();
        }
      }
    },
    // 获取列表
    async obtainList() {
      let { total, data } = await getCate({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      // 边界判断 如果当前页码没有数据了 且 当前页码不是第一页
      if (!data.length && this.currentPage !== 1) {
        this.currentPage -= 1; // 页码-1
        this.obtainList(); // 重新获取数据
      }
      // 处理数据
      data.forEach(v => {
        // 如果状态是1则变成true
        v.state = v.state == 1 ? true : false;
        v.isEdit = false; // 每一条数据 添加一个是否可以编辑的状态
      });
      // 渲染
      this.total = total;
      this.tableData = data;
    },

    // 当前页改变  传入页码
    handleCurrentChange(page) {
      // 页码变成当前页码
      this.currentPage = page;
      // 刷新列表
      this.obtainList();
    },
    // 每页条数改变  传入条数
    handleSizeChange(size) {
      // 条数等于当前条数
      this.pageSize = size;
      // 刷新列表
      this.obtainList();
    }
  },
  // 加载完成
  created() {
    // 获取账号列表
    this.obtainList();
  }
};
</script>

<style lang="less" scoped>
.goods-sort {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  margin: 0 20px;
  /deep/.el-card__header {
    padding-bottom: 0;
  }
  .goods-sort-title {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 700;
    box-sizing: border-box;
    button {
      align-self: flex-end;
    }
  }
  .goods-sort-content {
    margin-left: 10px;
  }
}
</style>