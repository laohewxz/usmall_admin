<template>
  <el-button type="danger" @click="del">删除</el-button>
</template>

<script>
export default {
  methods: {
    del() {
      //删除
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("confirm");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
</style>