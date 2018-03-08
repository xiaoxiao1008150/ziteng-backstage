<template>
  <div class="container">
    <header class="header layout">
      <div class="fl">
        <a href=""><img id="background" src="../../common/images/logo.png"></a>
      </div>
      <div class="fr client-management">
        <el-button type="primary" @click="signUp">注册</el-button>
        <el-button class="login-btn" @click="login">登录</el-button>
      </div>
    </header>
    <div class="banner">
      <!-- <img id="background" src="../../common/images/background.jpg"> -->
    </div>
    <div class="example-wrapper layout">
      <p class="title title-english">HOT GAMES</p>
      <div class="title-content">
        <p class="title title-chinese">热门游戏</p>
        <span class="bar bar-first"></span><span class="bar bar-second"></span>
      </div>
      <div class="example-item">
        <example></example>
      </div>
    </div>
    <example-footer></example-footer>
    <sign-up @signUpSuccess="signUpSuccess" @close="close" v-if="showSignUp"></sign-up>
    <login @close="close" v-if="showLogin"></login>
    <password @close="close" v-if="showPassword"></password>
  </div>
</template>
<script>
import Example from './example'
import Footer from './example/Footer'
import SignUp from './example/Signup'
import Login from './example/Login'
import Password from './example/Password'


export default {
  name: 'Index',
  data () {
    return {
      showSignUp:false,
      showLogin:false,
      showPassword:false
    }
  },
  created() {
  },
  methods:{
    signUpSuccess() {
      this.showSignUp = false
      this.showLogin = true
    },
    close (item) {
      if(item==='login'){
        this.showSignUp = false
        this.showLogin = true
      }else if(item==='signup'){
        this.showLogin = false
        this.showSignUp = true
      }else if(item==='password'){
        this.showPassword = true
        this.showLogin = false
        this.showSignUp = false
      }else{
        this.showSignUp = false
        this.showLogin = false
        this.showPassword = false
      }
    },
    signUp () {
      this.showSignUp = true
    },
    login () {
      this.showLogin = true
    }
  },
  components:{
   Example,
   // exampleMask:SignUp,
   exampleFooter:Footer,
   SignUp,
   Login,
   Password
  }
}
</script>
<style lang="stylus" scoped>
.layout
  padding:0 18%
.header
  // position: relative;
  // top:0
  // left:0
  width: 100%;
  height: 80px;
  line-height: 80px;
  color: #fff;
  font-size: 0
  a
    color: #333;
    text-decoration: none;
    display: block;
    height: 80px
#background
  height:80px
  vertical-align:sub
.banner
  height:300px
  background:url(../../common/images/background.jpg) no-repeat center
  background-size:100% 100%
  @media screen and (min-width: 1200px)
    height:500px
.client-management
  display:table-cell
  button
    width:100px
    height:40px
    letter-spacing: 3px
    vertical-align:middle
.example-wrapper
  padding-top:50px
  font-size:20px
  .title-content
    padding-bottom:20px
  .title
    text-align:center
  .title-english
    color:#c9c9c9
    margin-bottom:23px
    letter-spacing: 1px;
  .title-chinese
    // margin-bottom:10px
    // position:relative
  .bar
    width:25px
    height:5px
    display:inline-block
  .bar.bar-first
    background:#1b8fd5
  .bar.bar-second
    background:#6fbc56
</style>

