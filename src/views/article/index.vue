<template>
  <div>
    <!-- 筛选区域 -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>筛选条件</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="form.value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- /筛选区域 -->
    <!-- 列表 -->
    <el-card class="list-card">
      <div slot="header" class="clearfix">
        <span>共找到15条符合条件的内容</span>
      </div>
      <!-- table表格 -->
      <!-- data用来指定表格的数据
      表格不需要我们自己手动遍历
      只需要把数据给el-table的data属性就可以
      然后配置el-table-column 需要展示的数据字段即可
       -->
      <el-table
        class="list-table"
        :data="articles"
        v-loading="articleLoading"
        style="width: 100%">
        <el-table-column
          prop="cover.images[0]"
          label="封面"
          width="60">
          <!-- 表格列默认只能输出文本，如果需要自定义里边的内容，则需要 -->
          <!--
          slot-scope是插槽作用域，现在先听个名词，你要知道的是值，scope是起的一个名字
          scope中有个成员叫row
          也就是说scope.row就是当前的遍历项对象
          自定义列模板，el-table-column的prop就没有意义了
          -->
          <template slot-scope="scope">
            <img width="30" :src="scope.row.cover.images[0]" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-button type="success" plain>修改</el-button>
            <el-button type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /table表格 -->

      <!-- 数据分页 -->
      <!--
        一、 分多少页，默认每页10条
             有多少条数据
        二、页面改变加载对应的页码数据
      -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :disabled="articleLoading"
        @current-change="handleCurrentChange"
        >
      </el-pagination>
      <!-- /数据分页 -->
    </el-card>
    <!-- /列表 -->
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  data() {
    return {
      articles: [], // 列表数据
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        value1: ''
      },
      totalCount: 0,
      articleLoading: false,
      page: 1
    }
  },
  created() {
    this.loadArticles()
  },
  methods: {
    loadArticles(page = 1) {
      this.articleLoading = true
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page, // 请求数据的页码，不传默认为1
          per_page: 10// 请求数据的每页大小，不传默认为10
        }
      }).then(data => {
        this.articleLoading = false
        // console.log(data)
        this.articles = data.results // 列表数据
        this.totalCount = data.total_count // 总记录数
      })
    },
    onSubmit() {
      console.log('submit!')
    },
    handleCurrentChange(page) {
      this.page = page
      // console.log('submit!')
      this.loadArticles(page)
    },
    handleDelete(article) {
      // console.log(article)
      this.$http({
        method: 'DELETE',
        url: `/articles/${article.id}`
      }).then(data => {
        // console.log(data)
        this.loadArticles(this.page)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.filter-card {
  margin-bottom: 20px;
}
.list-table {
  margin-bottom: 30px;
}
</style>
