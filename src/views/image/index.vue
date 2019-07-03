<template>
  <el-card class="image-card">
    <div slot="header">
      <span>素材管理</span>
    </div>
    <div class="action">
      <el-radio-group v-model="active">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
      <el-button type="primary">上传图片</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px'}">
          <img src="http://toutiao.meiduo.site/FolIC64vftXGcx3K9tkCi2YLL-8S" class="image">
          <div style="padding: 10px; display: flex; justify-content: center;">
            <el-button type="primary" icon="el-icon-delete" circle plain></el-button>
            <el-button type="primary" icon="el-icon-star-off" circle plain></el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px'}">
          <img src="http://toutiao.meiduo.site/FolIC64vftXGcx3K9tkCi2YLL-8S" class="image">
          <div style="padding: 10px; display: flex; justify-content: center;">
            <el-button type="primary" icon="el-icon-delete" circle plain></el-button>
            <el-button type="primary" icon="el-icon-star-off" circle plain></el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px'}">
          <img src="http://toutiao.meiduo.site/FolIC64vftXGcx3K9tkCi2YLL-8S" class="image">
          <div style="padding: 10px; display: flex; justify-content: center;">
            <el-button type="primary" icon="el-icon-delete" circle plain></el-button>
            <el-button type="primary" icon="el-icon-star-off" circle plain></el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px'}">
          <img src="http://toutiao.meiduo.site/FolIC64vftXGcx3K9tkCi2YLL-8S" class="image">
          <div style="padding: 10px; display: flex; justify-content: center;">
            <el-button type="primary" icon="el-icon-delete" circle plain></el-button>
            <el-button type="primary" icon="el-icon-star-off" circle plain></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'ImageList',
  data() {
    return {
      active: '全部'
    }
  }
}
</script>

<style lang="less" scope>
.image-card {
  .action {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
