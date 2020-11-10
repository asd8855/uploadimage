<template>
  <div class="about">
    <span v-html="detail"></span>
  </div>
</template>

<script>
import AgreementSev from "@/api/agreement.js";
import editor from "@/components/editor";
export default {
  components: { editor },
  data() {
    return {
      detail: [],
    };
  },

  created() {
    let id = this.$route.query.id
    this.getDetail(id);
  },

  methods: {
    async getDetail(id) {
      const res = await AgreementSev.getDetail(id);
      if (res.code == 200) {
        this.detail = res.data.detail;
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