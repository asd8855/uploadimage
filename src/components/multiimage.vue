<template>
  <el-dialog
    title="图片批量上传"
    :visible.sync="dialogVisible"
    width="640px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
  >
    <div
      v-loading="loading"
      :element-loading-text="loadingtext"
    >
      <div class="mult_imgbox">
        <div
          v-for="(item,index) in imglist"
          :key="index"
        >
          <div class="imgboxsx">
            <img
              :src="item"
              alt
              @click="showimg"
            >
          </div>
          <span @click="cleanimg(index)">x</span>
        </div>
        <div
          class="add"
          v-show="imglist.length < 9"
        >
          <i class="el-icon-plus"></i>
          <input
            type="file"
            multiple
            ref="inputfile"
            @change="filechange"
          >
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          type="primary"
          @click="insertImg"
        >全部插入</el-button>
        <el-button
          size="small"
          type="primary"
          @click="imglist = []"
        >清空</el-button>
      </div>

      <!-- 显示大图 -->
      <album
        :list="imgArrays"
        :change="showAlbum"
      ></album>
    </div>
  </el-dialog>
</template>

<script>
import album from './Album';
// import url from '../api/url';
const url = {}
export default {
  props: ['show'],
  data() {
    return {
      dialogVisible: false,
      imglist: [],
      loading: false,
      loadingtext: '上传中',
      fileArr: [],
      uploadCount: 0,

      imgArrays: [],
      showAlbum: 0
    };
  },

  components: {
    album
  },

  watch: {
    show() {
      this.dialogVisible = true;
      setTimeout(() => {
        this.$refs.inputfile.value = '';
        this.fileArr = [];
        this.imglist = [];
      }, 0);
    },

    uploadCount(v) {
      if (v >= this.fileArr.length) {
        this.loading = false;
        this.fileArr = [];
        this.$refs.inputfile.value = '';
      }
    }
  },

  methods: {
    // 显示大图
    showimg(e) {
      if (e.target.tagName == 'IMG') {
        this.showAlbum = +new Date();
        this.imgArrays = [e.target.src];
      }
    },

    cleanimg(index) {
      this.imglist.splice(index, 1);
    },

    filechange(e) {
      if (
        e.target.files.length > 9 ||
        this.imglist.length + e.target.files.length > 9
      ) {
        this._alert({
          type: 'warning',
          msg: '一次最多上传9张图片'
        });
        this.fileArr = [];
        this.$refs.inputfile.value = '';
        return;
      }
      this.fileArr = e.target.files;
      this.loading = true;
      this.loadingtext = `文件上传中(0/${this.fileArr.length})`;
      this.uploadCount = 0;

      for (let i = 0; i < this.fileArr.length; i++) {
        this.uploadfile(this.fileArr[i]);
      }
    },

    uploadfile(file) {
      let fileType = file.type;
      if (fileType != 'image/png' && fileType != 'image/jpeg') {
        this._alert({
          type: 'warning',
          msg: '只能上传png、jpg格式的图片'
        });

        this.loading = false;
        this.fileArr = [];
        this.$refs.inputfile.value = '';

        return;
      }

      let formData = new FormData();
      // upFile就是后台接收的key
      formData.append('file', file, file.name);
      this.$http
        .post(url.uploadImg, formData)
        .then(data => {
          if (data.status == '0') {
            let url = data.data.fileUrl;
            this.imglist.push(url);
            this.uploadCount++;
            this.loadingtext = `文件上传中(${this.uploadCount}/${this.fileArr.length})`;
          } else {
            this.loading = false;
            this.fileArr = [];
            this.$refs.inputfile.value = '';
          }
        })
        .catch(err => {
          this.fmloading = false;
        });
    },

    insertImg() {
      if (this.imglist.length == 0) {
        this._alert({
          type: 'warning',
          msg: '请先上传图片'
        });
        return;
      }
      this.$emit('insertimg', this.imglist);
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.mult_imgbox {
  width: 100%;
  height: 244px;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 100px;
    height: 100px;
    margin-right: 20px;
    margin-bottom: 20px;
    border: 1px solid #f2ecec;
    position: relative;
    &:nth-child(5n) {
      margin-right: 0;
    }
    .imgboxsx {
      width: 100%;
      height: 100px;
      overflow: hidden;
      > img {
        display: block;
        min-width: 100%;
        height: 100%;
      }
    }

    > span {
      display: block;
      width: 20px;
      height: 20px;
      position: absolute;
      z-index: 1;
      right: -8px;
      top: -8px;
      background-color: #ff6562;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      color: #fff;
      cursor: pointer;
      border-radius: 50%;
      cursor: pointer;
    }
    &.add {
      font-size: 60px;
      text-align: center;
      line-height: 100px;
      color: #f2ecec;
      cursor: pointer;
      position: relative;
      input {
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
      }
    }
  }
}

.dialog-footer {
  text-align: right;
  padding-top: 20px;
}
</style>

