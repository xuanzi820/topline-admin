<template>
  <el-card>
    <div slot="header">
      <span>评论管理</span>
    </div>
    <el-table :data="articles">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="评论粉丝数"></el-table-column>
      <el-table-column label="允许评论">
        <template slot-scope="scope">
          <el-switch
            :disabled="scope.row.changeLoading"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChangeCommentStatus(scope.row)"
            >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'ArticleComment',
  data() {
    return {
      articles: [],
      changeLoading: false
    }
  },
  created() {
    this.loadArticles()
  },
  methods: {
    loadArticles() {
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(data => {
        // console.log(data)
        data.results.forEach(item => {
          item.changeLoading = false
        })
        this.articles = data.results
      })
    },
    handleChangeCommentStatus(item) {
      // console.log(item)
      item.changeLoading = true // 禁用按钮的启用状态
      this.$http({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: item.id.toString()
        },
        data: {
          allow_comment: item.comment_status
        }
      }).then(() => {
        this.$message({
          type: 'success',
          message: `${item.comment_status ? '启用' : '禁用'}评论状态成功`
        })
        item.changeLoading = false // 启用按钮的启用状态
      }).catch(err => {
        console.log(err)
        this.$message.error('修改评论状态失败')
        item.changeLoading = false // 启用按钮的启用状态
        item.comment_status = !item.comment_status
      })
    }
  }
}
</script>

<style lang="less" scope>
</style>
