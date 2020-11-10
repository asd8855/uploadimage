<template>
  <div class="about">
    <p
      v-for="item in list"
      :key="item._id"
      @click="gotoDetail(item._id)"
    >{{item.title}}</p>
  </div>
</template>

<script>
import AgreementSev from "@/api/agreement.js";
import editor from "@/components/editor";
export default {
  components: { editor },
  data() {
    return {
      list: [],
    };
  },

  created() {
    this.getList();
  },

  methods: {
    gotoDetail(id) {
        this.$router.push({path:'/agreementDetail',query:{id}})
    },
    async getList() {
      const res = await AgreementSev.getList();
      if (res.code == 200) {
        this.list = res.data;
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