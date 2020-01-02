<template>
  <div class="index">
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>
    <div class="main-content-area">
      <breadcrumb />
      <navigation-scroll />
      <div id="mainSection">
        <transition name="breadcrumb" mode="out-in">
          <keep-alive :include="cachList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import HeadNav from "./modules/HeadNav";
import LeftMenu from "./modules/LeftMenu";
import breadcrumb from "./modules/Breadcrumb";
import navigationScroll from "./modules/NavigationScroll";
import { mapState } from "vuex";
export default {
  name: "Index",
  components: {
    HeadNav,
    LeftMenu,
    breadcrumb,
    navigationScroll
  },
  computed: {
    ...mapState({
      cachList: (state) => state.permission.cachList.join(',')
    }),
  },
  data() {
    return {
    };
  },
};
</script>

<style>
.index {
  height: 100%;
  background-color: rgb(245, 245, 245);
}

.index .main-content-area {
  overflow: auto;
  height: calc(100% - 50px);
}
</style>
