<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          v-for="(item,index) in attrArr"
          :key="index "
        >
          <el-input placeholder="请输入名称" v-model="item.value"></el-input>
          <el-button type="primary" class="box" @click="addAttr" v-if="index==0">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delAttr(index)">删 除</el-button>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestSpecAdd,
  requestMenuAdd,
  requestSpecDetail,
  requestSpecUpdate,
  requestSpecCount,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  data() {
    return {
      attrArr: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  mounted() {
    // this.requestRoleList();
  },
  methods: {
    addAttr() {
      console.log(this.attrArr,'0000')
      this.attrArr.push({
        value: "",
      });
    },
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    ...mapActions({
      requestList: "spec/requestList",
      requestTotal: "spec/requestTotal",
    }),
    getDetail(id) {
      //点击编辑获取一条书数据的详细信息
      requestSpecDetail({ id: id }).then((res) => {
         this.form = res.data.list[0]
         this.attrArr =JSON.parse(res.data.list[0].attrs).map((item)=>({
           value:item
         })) 
        console.log( this.attrArr,88888888888)
      });
    },
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr=[{
        value:''
      }]
    },
    update() {
      this.form.attrs =JSON.stringify(this.attrArr.map((item)=>item.value)) 
      requestSpecUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestList();
          this.empty()
          this.cancel();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    add() {
      //添加
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性规格不能为空");
      }
      this.form.attrs =JSON.stringify(this.attrArr.map((item) => item.value));
      requestSpecAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          console.log( res,"pppppppppppppppppppppppppppppppppppp");
          this.cancel();
          this.requestList();
          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
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

<style scoped lang="stylus">
.add >>> .el-form-item__content {
  display: flex !important;
}

.add >>> .el-input {
  flex: 1;
}

.add >>> .el-button {
  width: auto;
}

.box {
  width: 120px;
}
</style>