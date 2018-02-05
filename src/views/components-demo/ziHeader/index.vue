<template>
  <div class="zi-header">
    <span>活动分类</span>
    <span>|</span>
    <span>{{currentLotteryItem.text}}</span>
    <div class="fr preview">
      <el-button class="small-btn" id="preview-btn" type="primary">预览</el-button>
      <el-button class="small-btn" id="save-btn">保存</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters} from 'vuex'

export default {
  name: 'ziHeader',
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'currentLotteryItem'
    ])
  },
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
.small-btn
  padding:0 20px
  height:30px
</style>