<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive exclude="slyderAPP,envelope">
        <router-view></router-view>
      </keep-alive>
      <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
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
  background:#f3f3f3
  position: absolute;
  left: 150px;
  right: 0;
  top: 70px;
  bottom: 0;
  width: auto;
  box-sizing: border-box;
  overflow-y: scroll;
</style>