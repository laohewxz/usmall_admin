<template>
  <div>
    <!-- Form -->

    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth" prop="pid" >
          <el-select v-model="form.pid" placeholder="请选择菜单">
            <el-option label="--请选择--" value aria-disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 加数据 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
            <!-- ----- -->
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type==1" prop="icon" >
          <el-select v-model="form.icon" placeholder="请选择菜单图标" :label-width="formLabelWidth">
            <el-option label="--请选择--" value aria-disabled></el-option>
            <el-option v-for="item in icon" :key="item" :label="item" :value="item"></el-option>
            <!-- 加数据 -->
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="120px" v-else  prop="url">
          <el-select v-model="form.url">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add('form')" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" v-else @click="updata('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestMenuAdd,
  requestMenuDetail,
  requestMenuUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  data() {
    return {
      radio: "1",
      icon: [
        "el-icon-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-s-grid",
      ],
      urls: [
        "/home",
        "/menu",
        "/role",
        "/manage",
         "/member",
        "/cate",
        "/spec",
        "/goods",
        "/banner",
        "/seckill",
      ],
      form: {
        pid: '',
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6个字符", trigger: "blur" },
        ],
         icon: [
            { required: true, message: '请选择菜单图标', trigger: 'change' }
          ],
         pid: [
            { required: true, message: '请选择上级菜单', trigger: 'change' }
          ],
         url: [
            { required: true, message: '请选择菜单地址', trigger: 'change' }
          ],
      },
    };
  },
  methods: {
    ...mapActions({
      requestList: "menu/requestList",
    }),
    getDetail(id) {
      requestMenuDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },

    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    cancel() {
      this.info.show = false;
      this.empty();
      this.info.isAdd = true;
    },
    updata(formName) {
      //修改

      this.$refs[formName].validate((valid) => {
        if (valid) {
          requestMenuUpdate(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.empty();
              this.cancel();
              this.requestList();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          requestMenuAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.requestList();
              this.info.show = false;
              this.empty();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>