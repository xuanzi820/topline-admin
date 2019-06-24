<template>
<!--
    el-menu
      default-active 指定默认激活的菜单项
      @open、@close 展示和收起菜单项的时候会触发
      background-color 设置菜单栏的背景色
      text-color 设置菜单栏文本颜色
      active-text-color 设置激活时候的高亮颜色
      router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
    el-submenu
      index 导航标识，可以用作路由导航路径，必须唯一
   -->
  <el-menu
      default-active="3"
      @open="handleOpen"
      @close="handleClose"
      background-color="#353b4e"
      text-color="#adafb5"
      router
      active-text-color="#409eff">
      <el-menu-item index="3">
        <i class="iconfont iconshouye"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont icongengduoneirong"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="1-2">
          <i class="iconfont iconfabuwenzhang2"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="1-3">
          <i class="iconfont iconneirongliebiao"></i>
          <span slot="title">内容列表</span>
        </el-menu-item>
        <el-menu-item index="1-4">
          <i class="iconfont iconpinglunliebiao"></i>
          <span slot="title">评论列表</span>
        </el-menu-item>
        <el-menu-item index="1-5">
          <i class="iconfont iconsucaiguanli1"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont iconfensiguanli1"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="2-2">
          <i class="iconfont iconsucaiguanli"  style="font-size: 14px;" ></i>
          <span slot="title">图文数据</span>
        </el-menu-item>
        <el-menu-item index="2-3">
          <i class="iconfont iconyichang_fensiliebiaoweikong_64" width="16px"></i>
          <span slot="title">粉丝概况</span>
        </el-menu-item>
        <el-menu-item index="2-4">
          <i class="iconfont  iconfensi1-copy"  style="font-size: 14px;" ></i>
          <span slot="title">粉丝画像</span>
        </el-menu-item>
        <el-menu-item index="2-5">
          <i class="iconfont iconfensiliebiao4"></i>
          <span slot="title">粉丝列表</span>
      </el-menu-item>
      </el-submenu>
      <el-menu-item index="4">
        <i class="iconfont iconzhanghuxinxi"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
</template>
<script>
export default {
  name: 'AppAside',
  data() {
    return {
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less" scoped>
.el-menu {
  height: 100%;
}
.iconfont {
  margin-right: 10px;
}
</style>
