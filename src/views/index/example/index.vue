<template>
<div>
  <el-row :gutter="20" style="margin-bottom:140px">
    <el-col class="margin-col" :xs="{span: 12}" :sm="{span: 12}" :md="{span: 6}"  v-for="(item,index) in lotteryData" :key="index">
      <el-card :body-style="{ padding: '0px' }">
        <img class="example-img" :src="'/static/images/' + item.num + '.jpg'">
        <div class="example-text">
          <span class="dot">.</span>
          <span>{{item.text}}</span>
          <span class="dot">.</span>
        </div>
      </el-card>
      <el-button type="primary" class="example-btn" @click="openModel">创建活动</el-button>
    </el-col>
  </el-row>
  <!-- <modal v-if="showModal">
    <div slot="body">
      <div class="close-tep"><span>请您先登录</span><span class="fr" @click="close">X</span></div>
    </div>
  </modal> -->
  <zi-dialog
  :imgUrl=currentLotteryItem.num
  :title=currentLotteryItem.text
  v-if="showModal"
  @close="showModal = false" 
  >
  </zi-dialog>
</div>

</template>
<script>
import Dialog from 'components/Dialog'
import Modal from 'components/Modal'
import { mapGetters} from 'vuex'

export default {
  name: 'example',
  data() {
    return {
      showModal:false,
    }
  },
   methods: {
    openModel () {
      this.showModal = true
    },
    close () {
      this.showModal = false
    }
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'lotteryData',
      'currentLotteryItem'
    ])
  },
  components:{
   ziDialog:Dialog
   // Modal
  }
}
</script>
<style lang="stylus" scoped>
.example-img
  width:100%
  display:block
.example-text
  height:50px
  line-height:50px
  font-size:14px
  color:#424242
  span
    vertical-align :middle
  .dot
    font-size: 35px
    position: relative
    top: -9px
.grid-content
  line-height:0
.example-btn
  margin-top:30px
  width:130px
.el-row
    margin-bottom: 20px
    &:last-child
      margin-bottom: 0
.close-tep
  height:25px
  line-height:35px
.margin-col
  margin-bottom:20px
</style>

