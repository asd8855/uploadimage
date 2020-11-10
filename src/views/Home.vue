<template>
  <div class="home">
    <div class="container">
      <div
        v-for="item in imageList"
        :key="item._id"
        class="item-container"
      >
        <el-image
          style="width: 100px; height: 100px"
          :src="item.IMAGE_URL"
          fit="scale-down;"
          :preview-src-list="[item.IMAGE_URL]"
        >
        </el-image>
        <span v-text="item.IMAGE_NAME"></span>
        <el-button
          type="text"
          v-clipboard:copy="item.IMAGE_URL"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >Copy!</el-button>

        <i
          class="delete el-icon-circle-close"
          @click="deleteImage(item._id)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import UploadSev from "@/api/upload.js";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      imageList: [],
    };
  },

  created() {
    this.getAllImages();
  },

  methods: {
    async getAllImages() {
      const res = await UploadSev.getAllImages();
      if (res.code == 200) {
        this.imageList = res.data;
      }
    },

    onCopy: function (e) {
      this.$message({
        message: "复制成功",
        type: "success",
      });
    },

    onError: function (e) {},

    async deleteImage(id) {
      const res = await UploadSev.deleteImage({ id });
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success",
        });
      }
      this.getAllImages();
    },

  },
};
</script>

<style lang="scss" scoped>
.image {
  width: 80px;
  max-height: 80px;
}

.container {
  display: flex;
  flex-wrap: wrap;
}

.item-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #eee;
  width: 100px;
  position: relative;
  margin-right: 16px;
  span {
    font-size: 12px;
    color: #666;
  }

  .delete {
    position: absolute;
    top: -11px;
    right: -11px;
    font-size: 22px;
  }
}
</style>
