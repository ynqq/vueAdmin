<template>
  <div>
    <span>{{rand}}</span>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      rand: 0,
      address: "",
      userName: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.rand = Math.random();
    });
  },
  activated(){
  },
  deactivated(){
  }
};
</script>

<style lang="scss" scoped>
</style>