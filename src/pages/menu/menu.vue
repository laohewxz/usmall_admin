<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info=info ref="add"></v-add>
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data(){
    return {
      info:{
        show:false,
        title:"菜单添加",
        isAdd:true
      }
    }
  },
  methods:{
    add(){
       this.info.show=true
    },
    edit(id){//点击编辑
        this.info.show=true
        this.info.isAdd = false
        this.info.title="菜单编辑"
        this.$refs.add.getDetail(id)
    }
  }
};
</script>

<style>
</style>