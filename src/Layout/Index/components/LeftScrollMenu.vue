<template>
  <Fragment v-if="!item.hidden ">
    <template v-if="hasOneRoute">
      <router-link :to="item.path">
        <el-menu-item :index="oneRoute.path">
          <i v-if="oneRoute.meta.icon" :class="oneRoute.meta.icon"></i>
          <span slot="title">{{oneRoute.meta.title}}</span>
        </el-menu-item>
      </router-link>
    </template>
    <template v-else>
      <el-submenu :index="item.path">
        <template slot="title">
          <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </template>
        <Left-scroll-menu
          v-for="child in item.children"
          :item="child"
          :key="child.path"
          :base-path="child.path"
        />
      </el-submenu>
    </template>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
export default {
  name: "LeftScrollMenu",
  props: {
    item: Object,
    basePath: String
  },
  components: { Fragment },
  computed: {
    hasOneRoute() {
      if (
        this.checkChild(this.item) || 
        (this.item.children && this.item.children.length == 1)
      ) {
        this.oneRoute = {
          ...this.item.children[0]
        };
        this.oneRoute.meta.icon = this.item.children[0].meta.icon;
        return true;
      } else if (!this.item.children) {
        this.oneRoute = {
          ...this.item
        };
        return true;
      }
      return false;
    }
  },
  data() {
    return {
      oneRoute: {}
    };
  },
  methods: {
    checkChild(list) {
      let num = 0;
      if (list.children) {
        list.children.map(v => {
          if (v.hidden) {
            num++;
          }
        });
      }
      // console.warn(list.children.length)
      if (list.children && num == list.children.length - 1) {
        // 有多个子菜单要显示
        return true;
      } else {
        return false;
      }
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
</style>