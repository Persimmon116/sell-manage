<template>
  <div class="account-list">
    <div class="account-container">
      <h1 class="title">账号列表</h1>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="账号" width="180">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="userGroup" label="用户组" width="180"></el-table-column>
        <el-table-column prop="date" label="创建时间" show-overflow-tooltip width="220"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[5, 10, 15, 20,25,30,35]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <div class="btn">
        <el-button type="danger" size="small">批量删除</el-button>
        <el-button type="success" size="small">取消选择</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      total: 35,
      tableData: [
        {
          date: "2016-05-01",
          name: "赵紫龙",
          userGroup: "超级管理员"
        },
        {
          date: "2016-05-01",
          name: "小凋残",
          userGroup: "超级管理员"
        },
        {
          date: "2016-05-01",
          name: "唐博沪",
          userGroup: "普通管理员"
        },
        {
          date: "2016-05-01",
          name: "秋香",
          userGroup: "普通管理员"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.account-list {
  padding: 0 20px;
  box-sizing: border-box;
  .account-container {
    background-color: #fff;
    padding-bottom: 10px;
    /deep/.el-table {
      margin-bottom: 20px;
      /deep/.el-table__header-wrapper {
        margin-left: 20px;
      }
      /deep/.el-table__body-wrapper {
        margin-left: 20px;
      }
    }
    .title {
      padding: 10px;
      box-sizing: border-box;
      border-bottom: solid 1px #f1f1f1;
      margin-bottom: 10px;
      font-size: 16px;
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
}
</style>