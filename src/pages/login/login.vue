<template>
  <div class="box">
    <div class="con">
      <h4>登录</h4>
      <el-input v-model="user.username" placeholder="请输入用户名" class="inp"></el-input>
      <el-input v-model="user.password" placeholder="请输入密码" class="inp" clearable show-password> ></el-input>
      <div>
        <el-button type="primary" class="btn" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { requestLogin } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
import{mapActions,mapGetters} from "vuex"
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      changeUser:"changeUser"
    }),
    login() {
      requestLogin(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.changeUser(res.data.list)//vuex保存信息
          this.$router.push("/");
        }else{
          warningAlert(res.data.msg)
        }
      });
    },
  },
};
</script>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553443, #323c5d);
}
.con {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 300px;
  height: 180px;
  padding: 25px 50px;
  border-radius: 7px;
}
.inp {
  margin-bottom: 20px;
}
h4 {
  text-align: center;
  margin-bottom: 10px;
}
.btn {
  width: 100%;
}
</style>