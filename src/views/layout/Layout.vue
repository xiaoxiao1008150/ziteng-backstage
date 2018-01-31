<template>
  <div class="app-wrapper">
    <navbar></navbar>
    <sidebar class="sidebar-container"></sidebar>
    <!-- <tags-view></tags-view> -->
    <app-main></app-main>
  </div>
</template>

<script>
// import { Navbar, Sidebar, AppMain, TagsView } from './components'
import Sidebar from './components/Sidebar/index'
import Navbar from './components/Navbar'
import TagsView from './components/TagsView'
import AppMain from './components/AppMain'

export default {
  components: {
    Navbar,//顶部右边的一些设置
    Sidebar,//左侧栏目
    AppMain,//右边栏
    TagsView
  }
}
</script>
<style lang="stylus" scoped>
.app-wrapper
  width: 100%;
  height: 100%;
  overflow: hidden;
</style>