<template>
  <div class="dashboard-container">
    <div class="sort-wrapper tep">
      <div class="sort-top clearfix">
        <span class="fl">活动分类</span>
        <!-- <div class="fr"><el-input  placeholder="请输入关键字搜索"></el-input></div> -->
      </div>
      <div class="sort-bottom">
        <div class="festival sort">
          <span>节日:</span>
          <span class="all" :class="{noactive: jsIndex!=='all'}" @click="openFullScreen('all')">全部</span>
          <ul class="sort-ul">
            <li  :class="{active: index===jsIndex}" 
              @click="openFullScreen(index)" 
              v-for="(item,index) in festivalData" 
              :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="sort">
            <span>类型:</span>
            <span class="all" :class="{noactive: jsIndex1!=='all'}" @click="openFullScreen1('all')" >全部</span>
            <ul class="sort-ul">
             <li 
             :class="{active: index===jsIndex1}"
              @click="openFullScreen1(index)" v-for="(item,index) in levelData" :key="index">{{item}}</li>
            </ul>
        </div>
      </div>
    </div>
    <div class="recommend tep">
      <div class="re-title">
      <!-- <span><svg-icon style="color:#1aadf0" :icon-class="user"></svg-icon></span> -->
      <span>活动推荐</span></div>
      <div class="re-classify">
        <el-row :gutter="20">
          <el-col class="margin-col" :xs="{span: 12}" :sm="{span: 12}" :md="{span: 6}" v-for="(item, index) in lotteryData" :key="index">
             <el-card>
              <div class="reco">
                <img :src="'/static/create/' + item.type + '.jpg' " class="image">
                <!-- <img :src="item.img" class="image"> -->
                <img class="reco-img" src="/static/create/reco.png">
              </div>
              <div>
                <div class="bottom clearfix">
                  <span class="re-name">{{ item.text }}</span>
                  <el-button  type="primary" class="create-btn fr" @click="openModel(item)">马上创建</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row> 
      </div>
    </div>
    <zi-dialog
      v-if="showModal"
      :currentActivity="{}"
      @close="showModal = false" 
      >
  </zi-dialog>
  </div>
</template>
<script>
let festivalData = ['春节','情人节','中秋节','母亲节','父亲节']
let levelData = ['抽奖活动', '签到活动','游戏活动']
import Dialog from 'components/Dialog'
import svgIcon from 'components/Icon'
import { mapGetters,mapMutations } from 'vuex'
import { getTemplates } from 'api/activity'



export default {
  name: 'AppMain',
  data () {
    return {
      showLoading:false,
      showModal:false,
      festivalData: festivalData,
      levelData:levelData,
      loadingObj:'',
      jsIndex:'all',
      jsIndex1:'all'
    }
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'lotteryData',
      'currentLotteryItem'
    ])
  },
  created () {
    this.getTemplates()
  },
  methods: {
    ...mapMutations([
      'setCurrentLottery',
      'initLotteryData'
    ]),
//     let lotteryData = [
//   {num:'01',text:'超级大转盘',type:'slyder'},
//   {num:'02',text:'抽红包',type:'envelope'},
//   {num:'03',text:'欢乐拼图',type:'jigsaw'},
//   {num:'04',text:'开宝箱',type:'box'}
// ]
    changeTemplateData (arr) {
      let result = []
      arr.forEach((item,index) =>{
        if(item.template_no === '123456') {
          result[index] = {num:'01',text:'超级大转盘',type:'slyder',templateNo:item.template_no}
        }else if(item.template_no === '234567'){
          result[index] = {num:'02',text:'抽红包',type:'envelope',templateNo:item.template_no}
        }
      })
      return result
    },
    getTemplates () {
      this.setLoading()
      getTemplates().then((res) =>{
        let data = res.data
        if(data.code === 'ok') {
          let result = this.changeTemplateData(data.list)
          // this.lotteryData = result
          // 将异步获取的数据 放到vuex全局
          this.initLotteryData(result)
          console.log('template', result)

          this.loading.close()
        }else{
          this.loading.close()
        }
      }).catch((res) =>{
        this.loading.close()
      })
    },
    openModel(item) {
      this.showModal = true
      this.setCurrentLottery(item)
    },
    setLoading () {
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    midFun (type, index) {
      this.jsIndex = ''
      this.jsIndex1 = ''
      this[type] = index
      this.setLoading()
      setTimeout(() => {
          this.loading.close()
        }, 500);
    },
    openFullScreen(index) {
      this.midFun('jsIndex', index)
    },
    openFullScreen1(index) {
      this.midFun('jsIndex1', index)
    }
  },
  components:{
   ziDialog:Dialog,
   svgIcon
  }
}
</script>
<style lang="stylus" scoped>
.bottom
    margin-top: 13px;
    text-align:left
    // padding-left:8px
    height: 30px;
    line-height: 30px;
.create-btn
  height:30px
  line-height:3px
.dashboard-container
  position:absolute
  background:#f3f3f3
  top:25px
  left:25px
  right:25px
  bottom:25px
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
  cursor:pointer
.sort-ul > .active
  color:#0dc1f1
.sort span,.sort-ul li
  padding: 0 10px
.sort span:first-child
  padding-left:0
.festival.sort
  margin-bottom:20px
.all
  color:#0dc1f1
  cursor:pointer
.all.noactive
  color:#000
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
  font-size: 13px
  color: #999
  margin-left:8px
.image
  width: 100%
  height:101px
  display: block
.reco
  position:relative
  .reco-img
    position :absolute
    width:40px
    top:-10px
    right:-10px
.margin-col
  max-width:280px
  margin-bottom:20px
</style>

