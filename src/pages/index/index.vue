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

          <!-- 有目录的循环 -->
          <el-submenu :index="item.id+''" v-for="item in user.menus" :key="item.id+''"  v-show="haschildren">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item :index="i.url" v-for="(i) in item.children" :key="i.title">{{i.title}}</el-menu-item>
          </el-submenu>

          <!-- 没有目录 -->
         <el-menu-item v-show="!haschildren"  :index="i.url" v-for="(i) in user.menus" :key="i.title">
            <span slot="title">{{i.title}}</span>
          </el-menu-item>

        </el-menu>

        <!-- 导航结束 -->
      </el-aside>
      <el-container>
        <el-header>
          <div class="div">
            <span>{{user.username}}</span>
            <el-button type="primary" @click="exit">退出</el-button>
          </div>
        </el-header>
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
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
    haschildren() {
      console.log(this.user.menus[0].children ? true : false,'ppppppppppppppppppppppp')
      return this.user.menus[0].children ? true : false;
    },
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    exit() {
      this.changeUser(null);
      this.$router.push("/login");
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.div {
  padding-top: 10px;
  float: right;
}
.nav {
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