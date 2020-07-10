<template>
  <Panel class="account-list">
    <span class="account-list-title" slot="title">账号列表</span>
    <div slot="content">
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

        <el-table-column prop="date" label="创建时间" show-overflow-tooltip width="180"></el-table-column>

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
          :current-page="currentPage"
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
      currentPage: 5,
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