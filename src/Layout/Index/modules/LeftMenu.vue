<template>
  <div class="left-menu">
    <el-scrollbar style="height:100%;overflow-x:hidden;">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#324057"
      text-color="#fff"
      :collapse="isCollapse"
      :default-active="nowRouter"
    >
      <template>
        <el-menu-item v-show="!isCollapse" @click="aFoldFunction()">
          <i class="el-icon-s-fold"></i>
          <span slot="title">收起侧边栏</span>
        </el-menu-item>
        <el-menu-item v-show="isCollapse" @click="aFoldFunction()">
          <i class="el-icon-s-unfold"></i>
          <span slot="title">展开侧边栏</span>
        </el-menu-item>
      </template>
      <Left-scroll-menu
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import LeftScrollMenu from "../components/LeftScrollMenu";
import { mapState } from "vuex";
export default {
  name: "LeftMenu",
  components: { LeftScrollMenu },
  computed: {
    ...mapState({
      routes: state => {
        console.log(state)
        return state.permission.routes;
      }
    }),
    nowRouter() {
      return this.$route.meta.showRouter || '';
    }
  },
  data() {
    return {
      isCollapse: false,
      leftMenuData: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    aFoldFunction() {
      this.isCollapse = !this.isCollapse;
    }
  },
  mounted() {
    this.leftMenuData = this.$router.options.routes;
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  box-sizing: border-box;
  width: 220px;
}

.left-menu .el-menu-vertical-demo {
  min-height: 100%;
}

.left-menu .el-submenu .el-menu-item {
  padding: 0 20px 0 53px !important;
}

.left-menu {
  float: left;

  height: calc(100% - 50px);
}

.left-menu .el-menu-vertical-demo {
  margin-right: -1px;
}
.el-scrollbar >>> .el-scrollbar__view{
  height: 100%;
}
.el-scrollbar >>> .el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>
