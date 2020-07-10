<template>
  <Panel class="goods-sort">
    <span class="goods-sort-title" slot="title">
      <span>商品分类</span>
      <el-button type="primary" size="small">添加分类</el-button>
    </span>
    <div class="goods-sort-content" slot="content">
      <el-table :data="tableData">
        <el-table-column prop="index" label="序号" width="100"></el-table-column>

        <el-table-column prop="sort" label="名称分类" width="200"></el-table-column>

        <el-table-column prop="nable" label="是否启用" width="200">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.menusstate"
              @change="change(scope.$index,scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      value: true,
      tableData: [
        {
          index: 1,
          sort: "热销榜"
        },
        {
          index: 2,
          sort: "单人套餐"
        },
        {
          index: 3,
          sort: "冰爽饮品"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    change: function(index, row) {
      console.log(index, row);
    }
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