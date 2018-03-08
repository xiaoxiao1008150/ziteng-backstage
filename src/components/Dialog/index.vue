<template>
  <modal :styleObject="styleObject">
    <div slot="header"></div>
    <div slot="body" class="index-dialog" v-if="showMainPop">
        <span class="close-icon" @click="close">
          <i class="el-icon-close"></i>
</span>
      <div class="index-tep">
        <div class="index-img">
          <img class="item-img" :src="'/static/images/' + currentLotteryItem.num + '-scan.jpg' ">
          <img class="arrow" src="/static/images/arrow.jpg ">
        </div>
        <div class="qrcode-wrapper">
          <div class="index-title">活动名称：{{currentLotteryItem.text}}</div>
          <div class="qrcode">
            <qrcode 
                  value="http://192.168.31.241:8888/activities/template/0e24b56d-efc7-435d-bc22-9778cd15f5a2/INDEX" 
                  :options="{ size: 130 }">
            </qrcode>
            <!-- <img class="qrcode-img" src="/static/images/qrcode.jpg"> -->
            <div class="qrcode-text">微信扫一扫体验活动</div>
          </div>
          <div v-if="!hasCreated">
            <el-button  id="create-btn" type="primary" @click='createProject'>创建活动</el-button>
          </div>
        </div>
        <div v-if="hasCreated" class="url-item">
            <input id="url-input" v-model="url"></input>
             <el-tooltip :disabled="disabled" content="链接已复制" placement="bottom">
              <el-button
              type="primary"
              v-clipboard:copy="url"
              v-clipboard:success="onCopy"
              style="height:35px;display:inline-block;width:60px;padding:0">复制</el-button>
            </el-tooltip>
         </div>
      </div>
    </div>
    <div slot="body" v-if="showLoginPop">
      <div class="close-tep"><span>请您先登录</span><span class="fr" @click="close">X</span></div>
    </div>
  </modal>
</template>
<script>
  import Modal from '../Modal'
  import { mapGetters} from 'vuex'
  import Qrcode from '@xkeshi/vue-qrcode';

  // import { mapGetters,mapMutations} from 'vuex'
  // import VueClipboard from 'vue-clipboard2'

  export default {
    props:{
      hasCreated:{
        type:Boolean,
        default:false
      }
    },
    data () {
      return {
        //通过设置不同的数据，返回不同的二维码,最好是通过 lottery 的当前模板对象获取网址
        qrcode:{val: "https://github.com",size: 130}, 
        disabled:true,
        url:'http://www.ziteng.com',
        styleObject:{
          height:'0',
        },
        showLoginPop:false,
        showMainPop:true
      }
    },
    created () {
    },
    computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'currentLotteryItem',
        'status',
      ])
    },
    methods:{
      onCopy: function (e) {
        this.disabled = false
      },
      copyUrl () {
      },
      // setRouterName () {
      //   let n = this.currentLotteryItem && this.currentLotteryItem.text
      //   let result
      //   switch(n)
      //   {
      //   case '超级大转盘':
      //     result = 'slyder'
      //     break;
      //   case '抽红包':
      //     result = 'envelope'
      //     break;
      //   case '欢乐拼图':
      //     result = 'jigsaw'
      //     break;
      //   case '开宝箱':
      //     result = 'box'
      //     break;
      //   default:
      //     result = false
      //   }
      //   return result
      // },
      close () {
        this.$emit('close')
      },
      createProject () {
        // 判断用户是否已经登录，未登录，弹窗提示登录
        // if(this.status!=='已经注册'){
        //   this.showMainPop = false
        //   this.showLoginPop = true
        // }else{
          // let name = this.setRouterName()
          this.$emit('close')
          // 在这里判断是那个模块点击的弹窗，关闭后，还是定位到本身的页面，而不是跳转 可能需要全局vuex
          // 获取模板预览地址 赋值到二维码的value 动态的
          let name = this.currentLotteryItem.type
          let templateNo = this.currentLotteryItem.templateNo
          if(name){
            this.$router.push({ path: `/create-project/${name}/${templateNo}`,})
          }
        // }
      }
    },
    created () {
    },
    mounted () {
      // console.log('res',this.$refs.qrcode)
      // let el = this.$refs.qrcode
      // var qrcode = new QRCode(el, {
      //   text: 'http://192.168.31.241:8888/activities/template/0e24b56d-efc7-435d-bc22-9778cd15f5a2/INDEX',
      //   width: 130,
      //   height: 130
      // });
      // new QRCode(el, 'your content');
    },
    components:{
      Modal,
      qrcode: Qrcode
    }
  }
</script>
<style lang="stylus" scoped>
.index-header
  height:30px
  line-height:30px
.close-icon
  position :absolute
  right:-10px
  cursor :pointer
  width: 50px;
  text-align: right;
.index-tep
  position :absolute
  top:15px
.index-img
  position:absolute
  top:0
  font-size:12px
  // background:url('/static/images/arrow.jpg') no-repeat 
  .item-img
    width:150px
    height:300px
  .arrow
    position :absolute
    width:46px
    height:46px
    top:127px
    left:150px
    margin: 0 10px
.index-dialog
  height:310px
  position:relative
  // top:-30px
.index-img
  position:absolute
  top:0px
  // left:200px
  font-size:12px
.qrcode-wrapper
  position:absolute
  top:0px
  left:216px
  font-size:12px
.index-title
  margin: 25px 0
.qrcode-img
    width:130px
    height:130px
    display:block
.qrcode-text
  margin: 20px 0 30px
#create-btn
  width:100%
.close-tep
  height:25px
  line-height:35px
#url-input
  border-radius:4px
  font-size:14px
  color:#606266
  width:110px
  -webkit-appearance: none;
  // -webkit-box-sizing: border-box;
  // box-sizing: border-box;
  color: #606266;
  display: inline-block;
  vertical-align:middle
  height: 35px;
  line-height: 35px;
  // outline: 0;
  padding: 0 15px;
  border:1px solid #ccc
  -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
.url-item
  position :absolute
  top: 240px;
  left: 180px;
  width:180px
</style>