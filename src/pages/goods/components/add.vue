<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="changeFirstCateId()">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCaterArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img :src="imageUrl" v-if="imageUrl" class="avatar" />
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" @change="changeSpecsId()">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" multiple placeholder="请选择">
            <el-option v-for="item in attrsArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="120px">
          <div id="desc"></div>
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
  requestGoodsAdd,
  requestGoodsDetail,
  requestGoodsUpdate,
  requestManageCount,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import E from "wangeditor";
export default {
  props: ["info"],
  data() {
    return {
      editor: null, //文本框
      secondCaterArr: [], //二级分类的数组
      attrsArr: [], //商品属性值
      imageUrl: "", //图片地址
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list", //一级分类列表
      specList: "spec/list",
    }),
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.requestCateList();
    }
    this.requestSpecList(true);
  },
  methods: {
    //修改了一级分类
    changeFirstCateId(b) {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCaterArr = this.cateList[index].children;
      console.log(this.secondCaterArr);
    },

    //修改了商规格
    changeSpecsId() {
      let index = this.specList.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.form.specsattr=""
      var nArr = this.specList[index].attrs;
      this.attrsArr = JSON.parse(nArr);
    },
    ...mapActions({
      requestRoleList: "role/requestList",
      requestGoodsList: "goods/requestList",
      requestTotal: "goods/requestTotal",
      //获取分类列表
      requestCateList: "cate/requestList",
      requestSpecList: "spec/requestList", //规格列表
    }),

    // 修改图片
    changeImg(e) {
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },

    //创建编辑器
    createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },

    //点击编辑获取一条书数据的详细信息
    getDetail(id) {
      requestGoodsDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgPre + this.form.img;
        this.form.specsattr = JSON.parse(this.form.specsattr);
        console.log(this.form)
      });
    },

    empty() {
      this.editor = null; //文本框
      this.secondCaterArr = []; //二级分类的数组
      this.attrsArr = []; //商品属性值
      this.imageUrl = ""; //图片地址
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
    },

    //修改
    update() {
      this.form.description = this.editor.txt.html();
      this.form.specsattr=JSON.stringify(this.form.specsattr)
      requestGoodsUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestGoodsList();
          this.cancel();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //添加
    add() {
      this.form.description = this.editor.txt.html();
       this.form.specsattr = JSON.stringify(this.form.specsattr )
      requestGoodsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.requestGoodsList();
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