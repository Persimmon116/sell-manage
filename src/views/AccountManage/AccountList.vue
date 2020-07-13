<template>
  <Panel class="account-list">
    <span class="account-list-title" slot="title">账号列表</span>
    <div slot="content">
      <el-table
        :data="tableData"
        ref="accTable"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="account" label="账号" width="180"></el-table-column>

        <el-table-column prop="userGroup" label="用户组" width="180"></el-table-column>

        <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip width="180"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteAccount(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1,  5, 10, 20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <div class="btn">
        <el-button type="danger" size="small" @click="batchDel">批量删除</el-button>
        <el-button type="success" size="small" @click="cancelSelect">取消选择</el-button>
      </div>
      <!-- 编辑模态框 -->
      <el-dialog title="编辑账号" :visible.sync="dialogVisible" width="360px">
        <!-- 编辑表单 -->
        <el-form :model="editForm" style="width: 275px;" size="small" label-width="60px">
          <el-form-item label="账号">
            <el-input v-model="editForm.account"></el-input>
          </el-form-item>

          <el-form-item label="用户组">
            <el-select v-model="editForm.userGroup">
              <el-option value="超级管理员">超级管理员</el-option>
              <el-option value="普通管理员">普通管理员</el-option>
            </el-select>
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
// 引入接口层axios
import {
  getAccountList,
  delAccount,
  batchDel,
  saveEditAccount
} from "@/api/account";
// 引入处理时间格式
import moment from "moment";
export default {
  components: {
    Panel
  },
  data() {
    return {
      // 表格数据
      tableData: [],
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 5,
      // 总条数
      total: 0,
      //模态框状态
      dialogVisible: false,
      editForm: { account: "", userGroup: "" } // 修改账号表单
    };
  },
  methods: {
    // 获取账号列表
    async obtainAccountList() {
      let { total, data } = await getAccountList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      // 处理时间
      data.forEach(v => {
        v.ctime = moment(v.ctime).format("YYYY-MM-DD hh:mm:ss");
      });

      // 边界判断
      if (!data.length && this.currentPage !== 1) {
        // 页码减1
        this.currentPage -= 1;
        // 重新获取数据
        this.obtainAccountList();
      }
      // 渲染
      this.total = total;
      this.tableData = data;
    },

    // 删除
    deleteAccount(id) {
      // 优化删除体验
      this.$confirm("你确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 确认删除
        .then(async () => {
          // 删除
          let { code } = await delAccount({ id });
          if (code === 0) {
            // 重新获取数据刷新
            this.obtainAccountList();
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
    // 当选项发生改变时
    handleSelectionChange(rows) {
      this.ids = rows.map(v => v.id);
    },

    // 批量删除
    batchDel() {
      // 删除优化
      if (!this.ids) {
        this.$message.error("请选择过后再操作");
        return;
      }
      // 删除优化
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 发送批量删除请求
          let { code } = await batchDel({
            ids: JSON.stringify(this.ids)
          });
          if (code === 0) {
            this.obtainAccountList(); // 刷新
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 取消选择
    cancelSelect() {
      this.$refs.accTable.clearSelection();
    },

    // 编辑数据回填  传入行
    handleEdit(row) {
      // 显示编辑模态框
      this.dialogVisible = true;
      // 数据回填   展开生成新对象
      this.editForm = { ...row };
    },
    // 保存编辑
    async saveEdit() {
      // 发送保存编辑请求
      let { code } = await saveEditAccount({
        id: this.editForm.id,
        account: this.editForm.account,
        userGroup: this.editForm.userGroup
      });

      if (code === 0) {
        // 刷新列表
        this.obtainAccountList();
        this.dialogVisible = false; // 关闭模态框
      }
    },

    // 当前页改变  传入页码
    handleCurrentChange(page) {
      // 页码变成当前页码
      this.currentPage = page;
      // 刷新列表
      this.obtainAccountList();
    },
    // 每页条数改变  传入条数
    handleSizeChange(size) {
      // 条数等于当前条数
      this.pageSize = size;
      // 刷新列表
      this.obtainAccountList();
    }
  },

  // 加载完成
  created() {
    // 获取账号列表
    this.obtainAccountList();
  }
};
</script>

<style lang="less" scoped>
.account-list {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 20px;
  /deep/.el-table {
    margin-bottom: 20px;
    /deep/.el-table__header-wrapper {
      margin-left: 20px;
    }
    /deep/.el-table__body-wrapper {
      margin-left: 20px;
    }
  }
  .account-list-title {
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    border-bottom: 1px solid #f1f1f1;
  }
  .pager {
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .btn {
    margin-left: 20px;
    margin-bottom: 20px;
  }
}
</style>