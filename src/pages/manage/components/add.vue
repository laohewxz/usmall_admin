<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form"  :rules="rules" ref="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth" prop="roleid">
          <el-select v-model="form.roleid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add('form')" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" v-else @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestManageAdd,
  requestMenuAdd,
  requestManageDetail,
  requestManageUpdate,
  requestManageCount,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输密码", trigger: "blur" },
          { min: 2, max: 12, message: "长度在 2 到 12个字符", trigger: "blur" },
        ],
         roleid: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
      },
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  mounted() {
    this.requestRoleList();
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestList",
      requestManageList: "manage/requestList",
      requestTotal: "manage/requestTotal",
    }),
    getDetail(id) {
      //点击编辑获取一条书数据的详细信息
      requestManageDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    update(formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {   requestManageUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestManageList();
          this.cancel();
        } else {
          warningAlert(res.data.msg);
        }
      });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },

    add(formName) {
      //添加

       this.$refs[formName].validate((valid) => {
          if (valid) {
           requestManageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.requestManageList();
          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
     
    },
    cancel() {
      //点击取消
      this.info.show = false;
      this.empty();
    },
  },
};
</script>

<style>
</style>