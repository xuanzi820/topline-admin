<template>
  <el-row class="app-header">
    <el-col :span="14">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="4" :offset="6">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
        <img width="30" :src="userInfo.photo">
          {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>账户设置</el-dropdown-item>
          <!-- 给组件注册原生事件：@原生事件类型.native=“处理函数”
          .native修饰符：http://cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6
          该事件会被注册给组件的根元素
          -->
          <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  },
  methods: {
    handleLogout() {
      // console.log(123)
      // 清除本地存储中的用户信息user_info
      window.localStorage.removeItem('user_info')
      this.$confirm('确定退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        // 退出当前页面
        this.$router.push({
          name: 'login'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.app-header{
  height: 60px;
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #409EFF;
  img {
    border-radius: 50%;
  }
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
