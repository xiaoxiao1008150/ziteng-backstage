<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>
<script>

export default {
  name: 'AppMain'
}
</script>
<style lang="stylus" scoped>
.app-main
  background:#ccc
  position: absolute;
  left: 150px;
  right: 0;
  top: 70px;
  bottom: 0;
  width: auto;
  padding: 20px 30px;
  box-sizing: border-box;
  overflow-y: scroll;
</style>