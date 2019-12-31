<template>
  <div class="navigation">
    <div class="main-margin">
      <div class="wrap">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" disabled autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.managerName" disabled autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" disabled autocomplete="new-password"></el-input>
          </el-form-item>

          <el-form-item label="管理员类型" :label-width="formLabelWidth">
            <el-input v-model="form.type" disabled autocomplete="new-password"></el-input>
          </el-form-item>
          <!-- <el-form-item label="添加时间" :label-width="formLabelWidth">
            <el-input v-model="form.addTime" disabled autocomplete="new-password"></el-input>
          </el-form-item> -->
          
          <el-form-item style="text-align:center;">
            <el-button
              type="default"
              class="backspace"
              @click="backspaceFunction"
              plain
            >返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personalInformation",
  data() {
    return {
      currentPosition: "个人信息",
      form: {
        name: "",
        managerName: "",
        phone: "",
        type: "",
        addTime: "",
        backspace: "返回"
      },
      // 表单label宽度
      formLabelWidth: "100px"
    };
  },
  methods: {
    // 个人信息: 返回函数
    backspaceFunction() {
      this.$router.back(-1);
    }
  },
  mounted() {
    // 获取 sessionStorage 数据 , 绑定到表单
    this.form.name = sessionStorage.getItem("Name");
    this.form.managerName = sessionStorage.getItem("ManagerName");
    this.form.phone = sessionStorage.getItem("Phone");
    this.form.type = '超级管理员';
    // this.form.addTime = sessionStorage.getItem("addTime");
  }
};
</script>

<style scoped >
.navigation .wrap {
  min-width: 500px;
  max-width: 600px;
}

</style>