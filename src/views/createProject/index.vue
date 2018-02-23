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
          <span class="all" @click="openFullScreen">全部</span>
          <ul class="sort-ul">
            <li  @click="openFullScreen" v-for="(item,index) in festivalData" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="sort">
            <span>类型:</span>
            <span class="all" @click="openFullScreen" >全部</span>
            <ul class="sort-ul">
             <li @click="openFullScreen" v-for="(item,index) in levelData" :key="index">{{item}}</li>
            </ul>
        </div>
      </div>
    </div>
    <div class="recommend tep">
      <div class="re-title">活动推荐</div>
      <div class="re-classify">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in lotteryData" :key="index">
             <el-card>
              <div class="reco">
                <img :src="'/static/create/' + item.type + '.jpg' " class="image">
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
      :imgUrl=currentLotteryItem.num
      :title=currentLotteryItem.text
      v-if="showModal"
      @close="showModal = false" 
      >
  </zi-dialog>
  <!-- <loading :showLoading="showLoading"></loading> -->
  </div>
</template>
<script>
let festivalData = ['春节','情人节','中秋节','母亲节','父亲节']
let levelData = ['抽奖活动', '签到活动','游戏活动']
import Dialog from 'components/Dialog'
// import Loading from 'components/Loading'
import { mapGetters,mapMutations } from 'vuex'

export default {
  name: 'AppMain',
  data () {
    return {
      showLoading:false,
      showModal:false,
      festivalData: festivalData,
      levelData:levelData
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
  },
  methods: {
    ...mapMutations([
      'setCurrentLottery', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ]),
    openModel(item) {
      this.showModal = true
      this.setCurrentLottery(item)
    },
    openFullScreen() {
      // this.showLoading = true
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        // this.showLoading = false
        loading.close()
      }, 500);
    }
  },
  components:{
   ziDialog:Dialog,
   // Loading
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
  background:#f3f3f3
  margin-top:60px
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
.sort span,.sort-ul li
  padding: 0 10px
.sort span:first-child
  padding-left:0
.festival.sort
  margin-bottom:20px
.all
  color:#0dc1f1
  cursor:pointer
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
</style>

