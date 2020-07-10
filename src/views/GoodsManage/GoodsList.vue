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
                <span>{{ props.row.sort }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <span>{{ props.row.img }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.appraise }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.count }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="id"></el-table-column>
        <el-table-column label="所属分类" prop="sort"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片" prop="img">
          <img :src="imgUrl" />
        </el-table-column>
        <el-table-column label="商品描述" prop="desc"></el-table-column>
        <el-table-column label="操作" prop="operate">
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20,25,30,35]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </Panel>
</template>

<script>
// 面板组件
import Panel from "@/components/panel/Panel.vue";
export default {
  components: {
    Panel
  },
  data() {
    return {
      currentPage: 5,
      total: 48,
      imgUrl: require("@/assets/images/elm.png"),
      tableData: [
        {
          id: "田园蔬菜粥",
          name: "好滋好味鸡蛋仔",
          sort: "特色粥品",
          price: 16,
          img: 16,
          date: "2020-07-10",
          appraise: 160,
          count: 150,
          desc: "一碗皮蛋瘦肉粥"
        },
        {
          id: "田园蔬菜粥",
          name: "好滋好味鸡蛋仔",
          sort: "特色粥品",
          price: 16,
          img: 16,
          date: "2020-07-10",
          appraise: 160,
          count: 150,
          desc: "一碗皮蛋瘦肉粥"
        },
        {
          id: "田园蔬菜粥",
          name: "好滋好味鸡蛋仔",
          sort: "特色粥品",
          price: 16,
          img: 16,
          date: "2020-07-10",
          appraise: 160,
          count: 150,
          desc: "一碗皮蛋瘦肉粥"
        },
        {
          id: "田园蔬菜粥",
          name: "好滋好味鸡蛋仔",
          sort: "特色粥品",
          price: 16,
          img: 16,
          date: "2020-07-10",
          appraise: 160,
          count: 150,
          desc: "一碗皮蛋瘦肉粥"
        }
      ]
    };
  }
};
</script>
<style>
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
    }
  }
}
</style>