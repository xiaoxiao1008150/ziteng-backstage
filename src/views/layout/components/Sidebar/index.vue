<template>
  <div class="sidebar">
    <!-- <el-menu mode="vertical" :default-active="$route.path"> -->
      <sidebar-item :routes="permission_routers"></sidebar-item>
    <!-- </el-menu> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'barActive'
    ])
  },
  watch :{
 
  },
  created () {
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
    background: #19adf0;
</style>