<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
          <p>留空则不修改</p>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestMemberUpdate,
  requestMemberDetail,
  requestMemberList,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        uid: 1,
        nickname: "",
        phone: "",
        password: "",
        status: '1',
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
      ...mapActions({
          requestList:"member/requestList"
      }),
    update() {
      //点击修改
      requestMemberUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.requestList()
          this.cancel()
        }else{
            warningAlert("修改失败")
        }
      });
    },
    getDetail(id) {
      //点击编辑获取详细的数据信息
      requestMemberDetail({ uid: id }).then((res) => {
        this.form=res.data.list
        this.form.password = ""
        this.form.uid = res.data.list.uid;
      });
    },
    cancel() {
      this.info.show = false;
      this.form = {
        uid: 1,
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
  },
};
</script>

<style>
</style>