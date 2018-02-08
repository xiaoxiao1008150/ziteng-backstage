<template>
<!-- <div class="container" style="display: none">
  <div class="verify-header">个人中心</div>
  <div class="item-wrapper">
    <div class="circle-tep">
      <div class="circle-item" v-for="(item,index) in data" :key="index" :class="{ noline: index === 2}">
        <div class="big-circle">
             <span>{{item}}</span>
        </div>
        <div class="circle-line" v-if="index !== 2"  >
        </div>
      </div>
    </div>
  </div>
  <div class='circle-text'>
      <p>提交成功，请等待管理员审核！</p>
      <span>预计3个工作日内审核完毕，审核结果会短信通过到您的注册手机上。</span>
  </div>
</div> -->
<div class="container">
  <div class="center-info">
    <span class="center-label">企业名称</span>
    <span class="label-text">中国农业银行顺德支行</span>
  </div>
  <div class="center-info">
    <span class="center-label">联系人</span>
    <span class="label-text">换小燕</span>
    <span class="may-change" @click="change('contact')">修改联系人</span>
  </div>
  <div class="center-info">
    <span class="center-label">手机号</span>
    <span class="label-text">1111111111</span>
    <span class="may-change" @click="change('tel')">更换手机号</span>
  </div>
  <div class="center-info">
    <span class="center-label label-tep">账号有效期</span>
    <div class="time-item">
      <div class="time">2018-01-10 09：00：00</div><div class="time">2018-01-10 09：00：00</div>
    </div>
  </div>
  <div class="center-info"><span class="center-label">企业名称</span><span>正常</span></div>
  <div class="center-info">
    <span class="center-label">密码状态</span>
    <span class="label-text">安全</span><span class="may-change" @click="change('password')">修改登录密码</span>
  </div>
  <tel v-show="showModalTel" @close="close"></tel>
  <contact v-show="showModalContact" @close="close"></contact>
  <password v-show="showModalPassword" @close="close"></password>
</div>
</template>
<script>
  import Tel from './update/Tel'
  import Contact from './update/Contact'
  import Password from './update/Password'

  export default {
    data() {
      return {
        active: 0,
        data:['注册',"审核","完成"],
        showModalContact:false,
        showModalTel:false,
        showModalPassword:false
      };
    },
    methods: {
      close () {
        this.showModalContact = false
        this.showModalTel = false
        this.showModalPassword = false
      },
      next() {
          if (this.active++ > 2) this.active = 0;
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
    components:{
      Tel,
      Contact,
      Password
    }
  }
</script>
<style scoped lang="stylus">
@import "~common/stylus/table"
.container
  padding: 30px 30px 100px
  text-align:left
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
  background:url('../../../static/center/center-2.png') no-repeat center
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
.circle-line
  height:2px
  width:150px
  background:url('../../../static/center/center-4.png') no-repeat center
  position:absolute
  top:30px
  left:64px
.circle-text
  p
    line-height :40px
  span
    font-size:13px
.center-info
  margin-bottom:20px
.center-label
  display:inline-block
  font-size :16px
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
  color:#1aadf0
  font-size:13px
  cursor :pointer
</style>
