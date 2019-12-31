<template>
  <div id="app" v-cloak>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {

  }
};
</script>

<style>
html,
body,
#app {
  /* 不显示滚动条 */
  overflow: hidden !important;
  width: 100%;
  height: 100%;
}
</style>
