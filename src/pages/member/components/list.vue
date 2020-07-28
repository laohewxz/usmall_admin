<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编 辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {requestMemberList} from "../../../util/request"
export default {
  data() {
    return {
      list:[]
    };
  },
  methods:{
     edit(id){
         this.$emit("edit",id)
     }
  },
  mounted(){
      requestMemberList().then((res)=>{
          console.log(res,'9999999999999999999999')
         this.list=res.data.list
      })
  }
};
</script>

<style>
</style>