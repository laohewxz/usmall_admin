<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changetime"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth" prop="first_cateid">
          <el-select v-model="form.first_cateid" @change="changeFirstCateId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth" prop="second_cateid">
          <el-select v-model="form.second_cateid" @change="second_">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCaterArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth" prop="goodsid">
          <el-select v-model="form.goodsid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
  requestSeckillAdd,
  requestSeckillDetail,
  requestSeckillUpdate,
  requestManageCount,
  requestGoodsList,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import E from "wangeditor";
export default {
  props: ["info"],
  data() {
    return {
      fid: 0,
      secondCaterArr: [], //二级分类的数组
      attrsArr: [], //商品属性值
      goodsArr: [], //详细商品
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: null,
        second_cateid: null,
        goodsid: null,
        status: 1,
      },
      value1: [],
      formLabelWidth: "120px",
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        goodsid: [{ required: true, message: "请选择商品", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list", //一级分类列表
      specList: "spec/list", //属性
      goodsList: "goods/list", //三级
    }),
  },
  watch: {
    goodsList(r) {
      console.log(r);
    },
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.requestCateList();
    }
    this.requestSpecList(true);
    this.requestGoodsList(true);
  },
  methods: {
    //修改了一级分类
    changeFirstCateId(b) {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCaterArr = this.cateList[index].children;
      this.fid = b;
    },

    //修改了二级分类
    second_() {
      requestGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.goodsArr = res.data.list;
      });
    },

    changetime(t) {
      //获取时间
      console.log(t[0], "7777777777777777777777777777");
      this.form.begintime = Date.parse(t[0]);
      this.form.endtime = Date.parse(t[1]);
      console.log(this.form.begintime, this.form.endtime, "uuuu");
    },

    //
    ...mapActions({
      requestRoleList: "role/requestList",
      requestSeckillList: "seckill/requestList",
      requestGoodsList: "goods/requestList",
      requestTotal: "goods/requestTotal",
      requestCateList: "cate/requestList", //获取分类列表
      requestSpecList: "spec/requestList", //规格列表
    }),

    //点击编辑获取一条书数据的详细信息
    getDetail(id) {
      requestSeckillDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.value1 = [
          new Date(Number(this.form.begintime)),
          new Date(Number(this.form.endtime)),
        ];
        this.changeFirstCateId();
        this.second_();
      });
    },

    empty() {
      this.secondCaterArr = []; //二级分类的数组
      this.attrsArr = []; //商品属性值
      this.imageUrl = ""; //图片地址
      this.value1 = [];
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: null,
        second_cateid: null,
        goodsid: null,
        status: 1,
      };
    },

    //修改
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.begintime = Number(this.form.begintime);
          this.form.endtime = Number(this.form.endtime);
          requestSeckillUpdate(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.requestSeckillList();
              this.cancel();
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

    //添加
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          requestSeckillAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.cancel();
              this.requestSeckillList();
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
    cancel() {
      //点击取消
      this.info.show = false;
      this.empty();
    },
  },
};
</script>


<style scoped lang="stylus">
.add >>> .el-upload {
  position: relative;
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add >>> .el-upload:hover {
  border-color: #409EFF !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  position: absolute;
  left: 0;
  top: 0;
  width: 178px;
  height: 178px;
  display: block;
}
</style>