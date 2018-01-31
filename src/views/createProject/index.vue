<template>
  <div class="dashboard-container">
    <div class="sort-wrapper tep">
      <div class="sort-top clearfix">
        <span class="fl">活动分类</span>
        <div class="fr"><el-input  placeholder="请输入关键字搜索"></el-input></div>
      </div>
      <div class="sort-bottom">
        <div class="festival sort">
          <span>节日:</span>
          <span class="all">全部</span>
          <ul class="sort-ul">
            <li>春节</li>
            <li>情人节</li>
            <li>中秋节</li>
            <li>母亲节</li>
            <li>父亲节</li>
          </ul>
        </div>
        <div class="sort">
            <span>类型:</span>
            <span class="all">全部</span>
            <ul class="sort-ul">
              <li>抽奖活动</li>
              <li>签到活动</li>
              <li>游戏活动</li>
            </ul>
        </div>
      </div>
    </div>
    <div class="recommend tep">
      <div class="re-title">活动推荐</div>
      <div class="re-classify">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in listData" :key="index">
             <el-card>
              <img src="/static/images/sort.jpg" class="image">
              <div>
                <!-- <span>好吃的汉堡</span> -->
                <div class="bottom clearfix">
                  <span class="re-name">{{ item.text }}</span>
                  <el-button type="primary" class="button fr" @click="openModel(item)">马上创建</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row> 
      </div>
    </div>
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
let exampleData = [
  {num:'01',text:'超级大转盘'},
  {num:'02',text:'抽红包'},
  {num:'03',text:'欢乐拼图'},
  {num:'04',text:'开宝箱'}
]
import Dialog from 'components/dialog'

export default {
  name: 'AppMain',
  data () {
    return {
      listData:exampleData,
      showModal:false,
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
.bottom
    margin-top: 13px;
    text-align:left
    padding-left:8px
    height: 40px;
    line-height: 40px;
.dashboard-container
  background:#ccc
.tep
  border:1px solid #adadad
  background:#fff
.sort-wrapper
  padding:0 10px
  margin-bottom:20px
.sort-top
  padding:20px 10px 20px
  font-weight:800
  border-bottom:1px solid #ccc
  span
    display:inline-block
    height:30px
    line-height:30px
  div
    display:inline-block
.sort-bottom
  padding:20px 10px 20px
.sort
  font-size:0
  text-align:left
.sort span,.sort ul
  display:inline-block
  font-size:12px
  vertical-align:middle
.sort-ul li
  float:left
.sort span,.sort-ul li
  padding: 0 10px
.sort span:first-child
  padding-left:0
.festival.sort
  margin-bottom:20px
.all
  color:#0dc1f1
.recommend
  padding: 0 10px
.re-title
  height:80px
  line-height:80px
  font-weight:800
  text-align:left
  border-bottom:1px solid #ccc
.re-classify
  padding: 20px 0
.re-name
  font-size: 13px;
  color: #999;
.image
  width: 100%;
  display: block;
</style>

