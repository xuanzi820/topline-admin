<template>
  <!-- el-select 组件
    value 属性，用来绑定同步的数据，
    change 事件，当选中项发生改变被触发，回调参数就是选项中的value
  -->
  <el-select
    :value="value"
    @change="handleChange"
    clearable>
    <!-- <el-option label="全部" value=""></el-option> -->
    <el-option
      v-for="item in channels"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ArticleChannel',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      channels: []
    }
  },
  components: {
  },
  created() {
    this.loadChannels()
  },
  methods: {
    handleChange(val) {
      // console.log(val)
      this.$emit('input', val)
    },
    loadChannels() {
      this.$http({
        method: 'GET',
        url: '/channels'
      }).then(data => {
        this.channels = data.channels
      }).catch(err => {
        console.log(err)
        this.$message.error('记载频道列表失败')
      })
    }
  }
}
</script>
<style lang="less" scope>
</style>
