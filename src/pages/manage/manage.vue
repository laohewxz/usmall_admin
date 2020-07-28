<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 添加 -->
    <v-add :info="info" ref="add"></v-add>
    <!-- 列表。 -->
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        show: false,
        title:"管理员添加",
        isAdd:true
      },
    };
  },
  methods: {
    edit(id){//编辑管理员
      this.info.show=true;
      this.info.title = '管理员编辑';
      this.info.isAdd=false;
      this.$refs.add.getDetail(id)
    },
    add() {//添加管理员
      this.info.show = true;
      this.info.title = '管理员添加';
      this.info.isAdd=true
    },
  },
};
</script>

<style>
</style>