<template>
  <div class="about">
    <el-form
      ref="form"
      label-width="80px"
      style="width: 800px"
    >
      <el-form-item label="名称">
        <el-input
          style="width:200px"
          v-model="title"
        ></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <editor
          @callback="e =>detail = e"
          :content="detail"
        ></editor>
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
import AgreementSev from "@/api/agreement.js";
import editor from "@/components/editor";
export default {
  components: { editor },
  data() {
    return {
      detail: "",
      title: "",
    };
  },

  methods: {
    async onSubmit() {
      let data = {
        title: this.title,
        detail: this.detail,
      };

      const res = await AgreementSev.save(data);
      if (res.code == 200) {
        this.$message({
          message: "保存成功",
          type: "success",
        });
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