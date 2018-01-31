<template>
  <div class="zi-header">
    <span>活动分类</span>
    <span>|</span>
    <span>大转盘抽奖</span>
    <div class="fr preview">
      <el-button type="primary">预览</el-button>
      <el-button >保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ziHeader',
  components:{
  }
}
</script>
<style lang="stylus" scoped>
.zi-header
  text-align:left
  height:60px
  line-height:60px
.zi-header span
  vertical-align :middle
.preview
  display:inline-block
</style>