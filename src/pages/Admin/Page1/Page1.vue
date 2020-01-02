<template>
  <div>
    <span>{{rand}}</span>
    <el-form label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="userName"></el-input>
      </el-form-item>
      <el-form-item label="地区">
        <el-select v-model="address">
          <el-option :value="1" label="请选择"></el-option>
          <el-option :value="2" label="江苏"></el-option>
          <el-option :value="3" label="上海"></el-option>
          <el-option :value="4" label="北京"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Page1",
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
  methods: {
    fetchList(){
    }
  },
  activated(){
    this.fetchList()
  },
  deactivated(){
  }
};
</script>

<style lang="scss" scoped>
</style>