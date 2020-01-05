<template>
  <div class="login" @keyup.enter="loginFunction('ruleForm')">
    <div class="wrap">
      <h1 class="title">后台管理系统</h1>
      <div class="content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          :label-width="formMargin"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" class="managerName" prop="managerName">
            <el-input v-model="ruleForm.managerName" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input v-model="ruleForm.passWord" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              class="login-button"
              @click="loginFunction('ruleForm')"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lodin",
  data() {
    return {
      loading: false,
      ruleForm: {
        managerName: "admin",
        passWord: "admin"
      },
      rules: {
        managerName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      formMargin: "70px"
    };
  },
  methods: {
    loginFunction(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let postdata = {
            ManagerName: this.ruleForm.managerName,
            PassWord: this.ruleForm.passWord
          };
          // this.loading = true;
          sessionStorage.Name = this.ruleForm.managerName
          this.$store.dispatch("permission/getRoutes");
          this.$router.replace("/Home");
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch("permission/getLoginOutRouter");
    });
  }
};
</script>

<style scoped>
.login {
  overflow: hidden;
  min-width: 600px;
  width: 100%;
  height: 100%;
  background-color: #324057;
}
.login .wrap {
  overflow: hidden;
  margin: 0 auto;
  margin-top: 200px;
  width: 400px;
  height: 290px;
  border-radius: 5px;
  background-color: #fff;
}

.login .wrap .title {
  margin-top: 46px;
  text-align: center;
  font-size: 26px;
}

.login .wrap .content {
  overflow: hidden;
  padding-right: 48px;
}

.login .wrap .content .managerName {
  margin-top: 36px;
}

.login .wrap .content .login-button {
  width: 100%;
}
</style>
