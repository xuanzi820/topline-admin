<template>
  <el-card>
    <div slot="header">
      <span>账户设置</span>
    </div>
    <el-row>
      <el-col :span="8">
        <el-form>
          <el-form-item label="媒体名称">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体简介">
            <el-input v-model="userInfo.intro"></el-input>
          </el-form-item>
          <el-form-item label="头条号ID">
            <el-input disabled :value="userInfo.id && userInfo.id.toString()"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机">
            <el-input disabled :value="userInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
            type="primary"
            @click="handleUpdate()"
            >保存更新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :offset="2" :span="4">
        <!-- el-upload上传组件，它会自动将用户选择的图片去请求上传，我们要做的就是配置一下
        action请求地址
        由于它用的是自己内部的请求，不是使用的axios去发请求
          完成路径
          它的请求也不会经过axios拦截器，所以需要手动设置token
        可惜的是它不支持自定义请求方法，前功尽弃
         -->
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/profile"
          :headers="{Authorization: token}"
          name='photo'
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'AccountSetting',
  data() {
    return {
      userInfo: {},
      token: `Bearer ${JSON.parse(window.localStorage.getItem('user_info')).token}`
    }
  },
  created() {
    this.loadUserInfo()
  },
  methods: {
    loadUserInfo() {
      this.$http({
        method: 'GET',
        url: '/user/profile'
      }).then(data => {
        // console.log(data)
        this.userInfo = data
      })
    },
    handleUpdate() {
      // console.log(123)
      const { name, intro, email } = this.userInfo
      this.$http({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name,
          intro,
          email
        }
      }).then(() => {
        this.$message({
          type: 'success',
          message: '保存用户信息成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('保存用户信息失败')
      })
    },
    handleAvatarSuccess() {},
    beforeAvatarUpload() {}
  }
}
</script>
<style lang="less" scope>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
