<template>
  <el-scrollbar
    @wheel.native.prevent="handleScroll"
    :vertical="false"
    class="navigationMain"
    ref="scrollContainer"
  >
    <el-tag
      :closable="index != 0"
      @close="deleteLink(index)"
      :class="[showIndex === index ? 'show' : '', 'tags']"
      v-for="(item, index) in list"
      :key="item.path"
      @click.prevent="handleLink(item)"
    >{{item.title}}</el-tag>
  </el-scrollbar>
</template>

<script>
export default {
  data() {
    let list = [
      {
        title: "Home",
        path: "/Home",
        name: "Home"
      }
    ];
    return {
      list: list,
      showIndex: 0
    };
  },
  watch: {
    $route(routes) {
      this.setList();
    }
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft - eventDelta / 4;
    },
    handleLink(item) {
      if (item.path !== this.$route.path) {
        this.$router.push(item.path);
      }
    },
    deleteLink(index) {
      let name = this.list[index].name
      this.$store.dispatch('permission/toggleCachList', {
        name,
        type: 0
      })
      if (index == this.showIndex) {
        this.showIndex = index == 0 ? 0 : index - 1;
        this.list.splice(index, 1);
        let nowRouter = this.list[this.showIndex];
        nowRouter && this.$router.replace(nowRouter.path);
      } else if (index < this.showIndex) {
        this.showIndex--;
        this.list.splice(index, 1);
      } else {
        this.list.splice(index, 1);
      }
    },
    setList() {
      let route = this.$route;
      if(!route.meta.showInBar){
        return this.showIndex = ''
      }
      if (
       
        !this.list.some((v, i) => {
          if (v.path === route.path) {
            this.showIndex = i;
          }
          return v.path === route.path;
        })
      ) {
        this.list.push({
          title: route.meta.title,
          path: route.path,
          name: route.name
        });
        this.showIndex = this.list.length - 1;
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.setList();
    });
  }
};
</script>

<style lang="scss" scoped>
.navigationMain {
  padding: 4px 15px;
  box-sizing: border-box;
  margin-left: -4px;
  box-shadow: 0px 0px 10px #d1d1d1;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
  /deep/ {
    .el-scrollbar__bar.is-vertical {
      width: 0;
    }
    .el-scrollbar__bar.is-horizontal {
      height: 0;
    }
    .el-scrollbar__wrap {
      overflow: auto;
      margin-right: 0 !important;
      margin-bottom: 0 !important;
    }
  }
  .tags {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    user-select: none;
    &:first-child {
      margin-left: 0;
    }
  }
  .show {
    color: red;
  }
}
</style>