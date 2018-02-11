<template>
  <div class="zi-header">
    <span>活动分类</span>
    <span>|</span>
    <span>{{currentItemFromRouter}}</span>
    <div class="fr preview">
      <el-button class="small-btn" id="preview-btn" type="primary">预览</el-button>
      <el-button class="small-btn" id="save-btn" @click="save">保存</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations} from 'vuex'

export default {
  name: 'ziHeader',
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'currentLotteryItem'
    ])
  },
  methods:{
    ...mapMutations([
      'setClickSave', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ]),
    save () {
      this.setClickSave(true)
    }
  },
  created () {
    let title = this.$route.meta.title
    this.currentItemFromRouter = title
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