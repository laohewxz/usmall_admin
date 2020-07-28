<template>
  <div>
      <!--。列表  -->
      <v-list @edit="edit"></v-list>
      <!-- 编辑  -->
      <v-edit :info='info' ref='add'></v-edit>
  </div>
</template>

<script>
import vList from "./components/list"
import vEdit from  "./components/edit"
export default {
  components:{
    vList,vEdit
  },
  data(){
    return {
      info:{
        show:false
      }
    }
  },
  methods:{
    edit(id){
      this.info.show=true
      this.$refs.add.getDetail(id)
    }
  }
}
</script>

<style>

</style>