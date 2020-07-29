<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="500"></el-table-column>
      
      <el-table-column  label="状态"  width="400">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { requestSeckillDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "seckill/list",
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
      requestSeckillDelete({ id: id }).then((res) => {
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
      requestList: "seckill/requestList",
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
    console.log(this.list,'ppooooooooooooooooooooooooooo')
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