<template>
  <div class="about">
    <el-form
      ref="form"
      label-width="80px"
      style="width: 800px"
    >
      <el-form-item label="上传图片">
        <el-upload
          class="upload-demo"
          action
          :http-request="fileUpload"
          :multiple="false"
          :file-list="fileList"
        >
          <el-button
            size="small"
            type="primary"
          >选择文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-input
          style="width:200px"
          v-model="name"
        ></el-input>
      </el-form-item>
      <el-form-item label="我的项目">
        <el-select
          v-model="product_code"
          placeholder="请选择"
        >
          <el-option
            v-for="item in productList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadFileSev from "@/utils/uploadFile.js";
import UploadSev from "@/api/upload.js";
export default {
  data() {
    return {
      fileList: [],
      name: "",
      product_code: "",
      key: "",
      productList: [
        {
          label: "学加家校园",
          value: "XJJXY",
        },
        {
          label: "学加家",
          value: "XJJ",
        },
      ],
    };
  },

  methods: {
    async fileUpload({ file }) {
      this.name = file.name.split(".")[0];
      const key = await UploadFileSev.uploadFile(file, (res) => {
        console.log("res", res);
      });
      this.key = key;
    },

    async onSubmit() {
      const { key, name, product_code } = this;
      if (!key) {
        this.$message({
          message: "请选择图片",
          type: "error",
        });
        return;
      }
      let domain = "https://static.imzhiliao.com/";
      let data = {
        product_code: product_code,
        key: key,
        name: name,
        url: `${domain}${key}`,
      };
      const res = await UploadSev.saveImage(data);
      if (res.code == 200) {
        this.$message({
          message: "保存成功",
          type: "success",
        });

        this.$router.push('/')
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.upload-demo {
  width: 200px;
}
</style>