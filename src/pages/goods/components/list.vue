<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="90"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="120"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="120"></el-table-column>
      <el-table-column  label="图片"  >
          <template slot-scope="scope">
            <img :src="$imgPre+scope.row.img" alt="">
         </template>
      </el-table-column>
      <el-table-column  label="是否新品"  width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isnew==1" type="primary">是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
      </el-table-column>
      <el-table-column  label="是否热卖"  width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.ishot==1" type="primary">是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
      </el-table-column>
      <el-table-column  label="状态"  width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="size" @current-change="cpage"></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { requestGoodsDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      size:"goods/size",
      total:"goods/total"
    }),
  },
  methods: {
    edit(id) {
      //编辑
      this.$emit("edit", id);
    },
    del(id) {//删除
      requestGoodsDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestList();
           this.requestTotal()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    ...mapActions({
      requestList: "goods/requestList",
      requestTotal:"goods/requestTotal",
      changePage:"goods/changePage"
    }),
    cpage(page){
         this.changePage(page);
         this.requestList()
         
    }
  },
  mounted() {
    this.requestList();
    this.requestTotal();
  },
};
</script>

<style scoped>
img{
  width: 100px;
  height: 100px;
}
.el-pagination{
  display: block;
  margin: 20px auto;
}
</style>