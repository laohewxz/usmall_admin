<template>
  <div class="add">
    <!-- Form -->

    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" v-else @click="updata">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestBannerAdd,
  requestBannerDetail,
  requestBannerUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  data() {
    return {
      //上传完成之后的图片地址
      imgUrl: "",
      form: {
        title: "",
        img: null,
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      requestList: "banner/requestList",
    }),
    changeImg(e) {
      //修改图片
      console.log(e);
      if (e.size > 2 * 1024 * 1024) {
        //传的图片不能超过2m
        warningAlert("上传的图片不能超过2M");
        return;
      }
      //判断后缀名
      var extname = e.name.slice(e.name.lastIndexOf("."));
      var extArr = [".png", ".jpg", ".gif", "jpeg"];
      if (!extArr.some((item) => item === extname)) {
        warningAlert("上传的文件必须是图片");
        return;
      }
      var file = e.raw;
      this.imgUrl = URL.createObjectURL(file); //生成一个URL地址 赋值给imageURL
      this.form.img = file;
    },
    getDetail(id) {//获取一条数据
      requestBannerDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgPre + res.data.list.img;
      });
    },

    empty() {
      this.form =  {
        title: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    cancel() {
      this.info.show = false;
      this.empty();
      this.info.isAdd = true;
    },
    updata() {//修改
      requestBannerUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    add() {//添加
      requestBannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestList();
          this.info.show = false;
          this.empty();
        } else {
          warningAlert(res.data.msg);
        }
      });
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