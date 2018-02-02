<template>
<div>
  <el-row :gutter="20" style="margin-bottom:140px">
    <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 6}"  v-for="(item,index) in exampleData" :key="index">
      <el-card :body-style="{ padding: '0px' }">
        <img class="example-img" :src="'/static/images/' + item.num + '.jpg'">
        <div class="example-text">
          <span class="dot">.</span>
          <span>{{item.text}}</span>
          <span class="dot">.</span>
        </div>
      </el-card>
      <el-button type="primary" class="example-btn" @click="openModel(item)">创建活动</el-button>
    </el-col>
  </el-row>
  <zi-dialog
  :imgUrl=num
  :title=title
  v-if="showModal"
  @close="showModal = false" 
  >
  </zi-dialog>
</div>

</template>
<script>
import Dialog from 'components/Dialog'

let exampleData = [
  {num:'01',text:'超级大转盘'},
  {num:'02',text:'抽红包'},
  {num:'03',text:'欢乐拼图'},
  {num:'04',text:'开宝箱'}
]
export default {
  name: 'example',
  data() {
    return {
      exampleData:exampleData,
      showModal:false,
      // item:{num:'01',text:'超级大转盘'},
      title:'超级大转盘',
      num:'01'
    }
  },
   methods: {
    openModel(item) {
      this.showModal = true
      this.title = item.text
      this.num = item.num
      // this.item = item
    }
  },
  components:{
   ziDialog:Dialog
  }
}
</script>
<style lang="stylus" scoped>
.example-img
  width:100%
  // height:250px
  display:block
.example-text
  height:50px
  line-height:50px
  font-size:14px
  color:#424242
  span
    vertical-align :middle
  .dot
    font-size: 35px;
    position: relative;
    top: -9px;
.grid-content
  line-height:0
.example-btn
  margin-top:30px
  width:130px
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>

