<template>
<div>
  <div class="container" v-if="showMain">
    <div class="verify-header">
    <span><i class="el-icon-arrow-left"></i></span>
    <span>个人中心</span></div>
    <div class="center-lay">
      <div class="item-wrapper">
        <div class="circle-tep">
          <div class="circle-item" v-for="(item,index) in data" :key="index" :class="{ noline: index === 2}">
            <div class="big-circle" :class="{ active: index === 2}">
                 <span>{{item}}</span>
            </div>
            <div class="circle-line" :class="{ active: index !== 0}" v-if="index !== 2"  >
            </div>
          </div>
        </div>
      </div>
      <div class='circle-text'>
          <p>提交成功，请等待管理员审核！</p>
          <span>预计3个工作日内审核完毕，审核结果会短信通知到您的注册手机上。</span>
      </div>
    </div>
  </div>
  <div class="container center-wrapper" v-if="!showMain">
    <div class="verify-header"><span><i class="el-icon-arrow-left"></i></span>
    <span>个人中心</span></div>
    <div class="center-lay">
      <div class="center-info">
        <span class="center-label">企业名称</span>
        <span class="label-text">{{userInfo.contract_name}}</span>
      </div>
      <div class="center-info">
        <span class="center-label">联系人</span>
        <span class="label-text">{{userInfo.contact_name}}</span>
        <span class="may-change" @click="change('contact')">修改联系人</span>
      </div>
      <div class="center-info">
        <span class="center-label">手机号</span>
        <span class="label-text">{{userInfo.mobile_number}}</span>
        <span class="may-change" @click="change('tel')">更换手机号</span>
      </div>
      <div class="center-info">
        <span class="center-label label-tep">账号有效期</span>
        <div class="time-item">
          <div class="time">{{userInfo.start_time}}</div><div class="time">{{userInfo.expired_time}}</div>
        </div>
      </div>
      <div class="center-info">
        <span class="center-label">企业名称</span>
        <span>正常</span>
      </div>
      <div class="center-info">
        <span class="center-label">密码状态</span>
        <span class="label-text">安全</span>
        <span class="may-change" @click="change('password')">修改登录密码</span>
      </div>
      <tel v-show="showModalTel" @close="close"></tel>
      <contact v-show="showModalContact" @close="close"></contact>
      <password v-show="showModalPassword" @close="close"></password>
    </div>
  </div>
</div>
</template>
<script>
  import Tel from './update/Tel'
  import Contact from './update/Contact'
  import Password from './update/Password'
  import { mapGetters } from 'vuex'


  export default {
    data() {
      return {
        active: 0,
        data:['注册',"审核","完成"],
        showModalContact:false,
        showModalTel:false,
        showModalPassword:false,
        showMain:true,
        userInfo:{}
      };
    },
    methods: {
      close () {
        this.showModalContact = false
        this.showModalTel = false
        this.showModalPassword = false
      },
      change (item) {
        if(item==='contact') {
          this.showModalContact = true
        }else if(item==='tel') {
          this.showModalTel = true
        }else{
          this.showModalPassword = true
        }
      }
    },
    computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'status',
      'code'
    ])
  },
    activated () {
      let userInfo = JSON.parse(localStorage.getItem('USER_INFO'))
      console.log(localStorage.getItem('USER_INFO'))
      this.userInfo = userInfo
      // // 拉取信息 确定状态status字段
      if(this.status==='login' && this.code === '1'){
        this.showMain = false
      }
    },
    components:{
      Tel,
      Contact,
      Password
    }
  }
</script>
<style scoped lang="stylus">
@import "~common/stylus/table"
.center-wrapper
  text-align:left
.center-lay
  padding:30px 30px 100px
  font-size:14px
.item-wrapper
  padding:80px 30px
  // background:#fff
  margin:auto
.circle-tep
  // width:80%
  // width:845px
  width:492px
  height:64px
  margin:auto
.circle-item
  position:relative
  float:left
  width:214px
.circle-item.noline
  width:64px
.big-circle
  width:64px
  height:64px
  border-radius:100%
  background:url('../../../static/center/center-1.png') no-repeat center
  background-size :cover
  line-height:64px
  // border:2px solid #1aadf0
  // position:relative
  span
    display:inline-block
    height:45px
    line-height:45px
    font-size:14px
    color:#000
.big-circle.active
    background-image:url('../../../static/center/center-2.png')
.circle-line
  height:2px
  width:150px
  background:url('../../../static/center/center-3.png') no-repeat center
  position:absolute
  top:30px
  left:64px
.circle-line.active
   background-image:url('../../../static/center/center-4.png')
.circle-text
  p
    font-size:20px
    margin-bottom:15px
  span
    font-size:13px
    color:#575757
.center-info
  margin-bottom:20px
.center-label
  display:inline-block
  font-weight:800
  width:110px
.label-tep
  vertical-align:top
.time-item
  display:inline-block
.label-text
  display:inline-block
  width:220px
.may-change
  display :inline-block
  width:80px
  color:#1aadf0
  font-size:13px
  cursor :pointer
</style>
