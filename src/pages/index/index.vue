<template>
  <div class="out">
    <el-container>
      <el-aside width="200px">
        <!-- //导航开始 -->
        <el-menu
          default-active
          class="el-menu-vertical-demo"
          background-color="#20222a"
          router
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/manage">管理员管理</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item index="/cate">商品分类</el-menu-item>
            <el-menu-item index="/spec">商品规格</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/member">会员管理</el-menu-item>
            <el-menu-item index="/banner">轮播图管理</el-menu-item>
            <el-menu-item index="/seckill">秒杀活动</el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- 导航结束 -->
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <!-- ----- -->
          <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 路由 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav{
  margin-bottom: 20px;
}
.out {
  width: 100wv;
  height: 100vh;
}
.el-aside {
  height: 100vh;
  background-color: #20222a;
}
.el-header {
  background-color: #b3c0d1;
}
</style>