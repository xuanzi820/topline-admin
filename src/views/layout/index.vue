<template>
    <el-container>
      <el-aside width="200px"><AppAside/></el-aside>
      <el-container>
        <el-header><AppHeader/></el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
    <!-- 这里是内容是 Home、发布文章、评论管理。。。。 -->
</template>
<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'
export default {
  name: 'AppLayout',
  components: {
    AppAside,
    AppHeader
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #D3DCE6;
}
.el-header {
  background-color: #B3C0D1;
}
.el-main{
  background-color: #ddd;
}
</style>
