<template>
  <div class="sidebar">
    <el-menu mode="vertical" :default-active="$route.path"  background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
    // isCollapse() {
    //   return !this.sidebar.opened
    // }
  }
}
</script>
<style lang="stylus">
  .sidebar
    display: block;
    position: absolute;
    width: 150px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: #2e363f;
</style>