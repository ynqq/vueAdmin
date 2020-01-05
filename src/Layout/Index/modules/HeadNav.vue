<template>
  <header class="head-nav">
    <h1 class="logo">后台管理系统模板</h1>
    <el-dropdown class="drop-down" trigger="click">
      <span class="el-dropdown-link">
        {{userName}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="options">
        <el-dropdown-item>
          <template>
            <el-button type="text" @click="personalInformation">个人信息</el-button>
          </template>
        </el-dropdown-item>
        <el-dropdown-item>
          <template>
            <el-button type="text" @click="modifyCipherFunction">修改密码</el-button>
          </template>
        </el-dropdown-item>
        <el-dropdown-item>
          <template>
            <el-button type="text" @click="open">退出登录</el-button>
          </template>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <changePassword ref="changePassword"></changePassword>
  </header>
</template>
<script>
import changePassword from "@/components/UserInfo/changePassword";
export default {
  name: "HeadNav",
  components: {
    changePassword
  },
  data() {
    return {
      userName: "",
      form: {
        passWord: "",
        newPassWord: "",
        managerCode: ""
      }
    };
  },
  methods: {
    open() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          sessionStorage.clear();
          this.$router.replace("/Login");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          
        });
    },
    modifyCipherFunction() {
      let dataPassedToChildren = {
        dialogBoxTitle: "修改密码"
      };
      this.$refs.changePassword.renderData(dataPassedToChildren);
    },
    personalInformation() {
      this.$router.push("/AdminUserInfo");
    }
  },
  mounted() {
    this.userName = sessionStorage.getItem("Name");
  }
};
</script>
<style scoped>
.el-dropdown-link {
  color: #ffffff;

  cursor: pointer;
}
.head-nav {
  box-sizing: border-box;

  height: 50px;

  border-bottom: 1px solid #1f2d3d;

  background-color: #324057;

  color: #ffffff;
}

.head-nav .logo {
  display: inline-block;

  box-sizing: border-box;

  padding: 0 0 0 25px;

  width: 220px;

  font-size: 16px;

  line-height: 50px;
}

.head-nav .drop-down {
  float: right;

  margin-right: 60px;

  line-height: 50px;
}

.options li {
  padding: 0 20px;

  line-height: 34px;
}

.head-nav {
  min-width: 600px;
}

.el-button--text {
  color: #606266;
}

.el-button--text:hover {
  color: #409eff;
}
</style>
