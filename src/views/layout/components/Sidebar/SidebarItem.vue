<template>
  <div>
    <el-menu
      background-color="#19adf0" 
      text-color="#fff"
      active-text-color="#fff"
      >
      <router-link  v-for="item in routes" v-if="item.children && item.children.length>=1" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>
<script>

import svgIcon from 'components/Icon'
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
  created () {
  },
  components:{
    svgIcon
  }
}
</script>