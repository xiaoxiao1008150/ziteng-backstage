<template>
  <header class="navbar">
    <div class="fl">
        <a href="/login"><img id="background" src="../../../common/images/logo.png"></a>
    </div>
    <div class="fr client-management">
      <span class="client-name"><svg-icon style="color:#1aadf0" :icon-class="iconName.user"></svg-icon><i>用户名</i></span>
      <span class="client-out"><svg-icon style="color:#ccc" :icon-class="iconName.tuichu"></svg-icon><i>退出</i></span>
    </div>
  </header>
</template>
<script>
import svgIcon from 'components/Icon'

export default {
  name: 'Navbar',
  data () {
    return {
      iconName:{
        user: 'user',
        tuichu: 'tuichu'
      }
    }
  },
  components:{
    svgIcon
  }
}
</script>
<style lang="stylus" scoped>
.navbar
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  font-size: 22px;
  line-height: 80px;
  color: #fff;
  padding:0 15px
.client-management i
  color:#000
  font-size:13px
  font-style:normal
  margin-left:5px
.client-management i,.client-management span
  vertical-align:middle
.client-name
  margin-right: 12px
.client-name,.client-out
  cursor :pointer
</style>