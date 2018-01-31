<template>
  <header class="navbar">
    <div class="fl">
        <a href=""><img id="background" src="../../../common/images/logo.png"></a>
    </div>
    <div class="fr client-management">
      <el-button type="primary">用户名</el-button>
      <el-button >退出</el-button>
    </div>
  </header>
</template>
<script>

export default {
  name: 'Navbar'
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
</style>