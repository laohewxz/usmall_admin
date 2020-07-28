<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
      <el-table-column prop label="图片">
        <template slot-scope="scope">
         <img :src="$imgPre+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { requestCateDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      requestList: "cate/requestList",
    }),
    edit(id) {
      //编辑
      this.$emit("edit", id);
    },
    del(id) {
      //删除
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          requestCateDelete({id:id}).then(res=>{
             if(res.data.code==200){
               successAlert(res.data.msg)
               this.requestList()
             }else{
               warningAlert(res.data.msg)
             }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    console.log(this.list);
    this.requestList();
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>