<template>
  <div class="increaseManagement">
    <el-dialog
      :title="dialogBoxTitle"
      class="increaseManagementDialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :show-close="false"
      :close-on-press-escape="false"
      lock-scroll
      :visible.sync="switchDialog"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="原密码" prop="passWord" :label-width="formLabelWidth">
          <el-input
            v-model="form.passWord"
            clearable
            placeholder="请输入原密码"
            autocomplete="new-password"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassWord" :label-width="formLabelWidth">
          <el-input
            v-model="form.newPassWord"
            placeholder="请输入新密码"
            autocomplete="new-password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPassWordAffirm" :label-width="formLabelWidth">
          <el-input
            v-model="form.newPassWordAffirm"
            placeholder="请再次输入密码"
            autocomplete="new-password"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelButtonFunction()">取 消</el-button>
        <el-button type="primary" @click="submitData('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "changePassword",
  data() {
    // 密码验证 ：代码开始 ○ ↓ -->
    var newPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        if (this.form.newPassWordAffirm !== "") {
          this.$refs.form.validateField("newPassWordAffirm");
        }
        callback();
      }
    };
    var newPassWordAffirm = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPassWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 密码验证 ：代码结束 ● ↑ -->
    return {
      form: {
        passWord: "",
        newPassWord: "",
        newPassWordAffirm: "",
        managerCode: ""
      },
      formLabelWidth: "100px",
      rules: {
        passWord: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        newPassWord: [
          { required: true, validator: newPassWord, trigger: "blur" }
        ],
        newPassWordAffirm: [
          { required: true, validator: newPassWordAffirm, trigger: "blur" }
        ]
      },
      dialogBoxTitle: "修改密码",
      switchDialog: false
    };
  },
  methods: {
    // 表单验证, 修改密码函数 ：代码开始 ○ ↓ -->
    submitData(form) {
      if (this.form.passWord !== sessionStorage.oldPsw) {
        return this.$message.warning("原密码错误");
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          let postdata = {
            UserCode: sessionStorage.ManagerCode,
            OrdPassWord: sessionStorage.oldPsw,
            NewPassWord: this.form.newPassWord
          };
          this.$axios({
            url: "user/AdminUserNewPassWord",
            data: {
              Json: JSON.stringify(postdata)
            }
          })
            .then(res => {
              if (res.flag === "1000") {
                sessionStorage.oldPsw = postdata.NewPassWord;
                this.$message({
                  message: res.msg || "成功修改密码",
                  type: "success"
                });
                this.switchDialog = !this.switchDialog;
                this.$refs["form"].resetFields();
              } else if (res.flag === "1001") {
                this.$message({
                  message: res.msg || "操作失败",
                  type: "warning"
                });
              } else if (res.flag) {
                this.$message.error(res.msg || "操作失败");
              }
            })
            .catch(err => {
              this.$message.error("请求失败");
            });
          // axios ：代码结束 ● ↑ -->
        } else {
          console.log("表单验证失败");
          return false;
        }
      });
    },
    // 表单验证, 修改密码函数 ：代码结束 ● ↑ -->
    // 修改 (渲染数据) ：代码开始 ○ ↓ -->
    renderData(obj) {
      // 1. 替换对话框标题
      this.dialogBoxTitle = obj.dialogBoxTitle;
      // 2. 数据绑定完成, 打开修改管理员信息对话框
      this.switchDialog = !this.switchDialog;
    },
    // 对话框取消按钮函数
    cancelButtonFunction() {
      //1. 关闭管理员信息对话框
      this.switchDialog = !this.switchDialog;
      //2. 重置数据 (重置表单验证)
      this.$refs["form"].resetFields();
    }
  },
  mounted() {
    this.form.managerCode = sessionStorage.getItem("managerCode");
  }
};
</script>

<style scoped>
.index
  .increaseManagement
  .increaseManagementDialog
  >>> .el-dialog
  > div:not(:first-child) {
  padding: 20px 60px 10px 0px;
}

.index .increaseManagement .increaseManagementDialog >>> .el-dialog {
  min-width: 500px;

  max-width: 600px;
}
</style>