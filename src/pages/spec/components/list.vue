<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column prop="rolename" label="规格属性">
        <template slot-scope = "scope">
          <el-tag type="success" v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="状态">
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
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="cpage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { requestSpecDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "spec/list",
      size: "spec/size",
      total: "spec/total",
    }),
  },
  methods: {
    edit(id) {
      //编辑
      this.$emit("edit", id);
    },
    del(id) {
      requestSpecDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestList();
          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    ...mapActions({
      requestList: "spec/requestList",
      requestTotal: "spec/requestTotal",
      changePage: "spec/changePage",
    }),
    cpage(page) {
      this.changePage(page);
      this.requestList();
    },
  },
  mounted() {
    this.requestList();
    this.requestTotal();
    console.log(this.total, 666666666666666666);
  },
};
</script>

<style scoped>
.el-pagination {
  display: block;
  margin: 20px auto;
}
</style>