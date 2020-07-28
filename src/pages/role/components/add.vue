<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-checked-keys="defaultKey"
            :props="defaultProps"
          ></el-tree>
          <!--:default-checked-keys="defaultKey"  默认选中  -->
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestRoleAdd,
  requestRoleDetail,
  requestRoleUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  mounted() {
    this.requestMenuList();
  },
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultKey: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestList",
      requestMenuList: "menu/requestList",
    }),
    cancel() {
      this.info.show = false;
     if (!this.info.isAdd) {
        this.empty();this.$refs.tree.setCheckedNodes([])
      }
      
    },
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      console.log(this.form.menus); //添加的请求
      requestRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.list);
          this.cancel();
          this.requestRoleList();
          console.log(this.form);
        } else {
          warningAlert(res.data.list);
        }
      });
    },
    getDetail(id) {
      //获取一条信息
      //   console.log(id);
      requestRoleDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        console.log(res.data.list);
        this.defaultKey = JSON.parse(res.data.list.menus);
      });
    },
    //点击修改
    update() {
      //修改的menus的值赋给form.menus
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requestRoleUpdate(this.form).then((res)=>{
          if(res.data.code==200){
              successAlert(res.data.msg)
              this.empty()
              this.cancel()
              this.requestRoleList()
              this.$refs.tree.setCheckedNodes([])
          }else{
              warningAlert(res.data.msg)
          }
      })

    },
  },
};
</script>

<style>
</style>