<template>
  <div>
<el-button type="primary" @click="add">添加</el-button>
      <v-list @edit="edit($event)"></v-list>

      <!-- 弹框 添加 -->
      <v-add :info = "info"  ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add"
export default {
  components :{
    vList,vAdd
  },
  data(){
    return {
      info:{
        show:false,
        title:"添加角色",
        isAdd:true
      }
    }
  },
  methods:{
    edit(id){//编辑
      this.info.show = true
      this.info.title="编辑角色"
      this.info.isAdd=false
      this.$refs.add.getDetail(id)
    }
    ,
    add(){//添加
      this.info.show=true
      this.info.title="添加角色"
      this.info.isAdd=true
    }
  }
}
</script>

<style>

</style>