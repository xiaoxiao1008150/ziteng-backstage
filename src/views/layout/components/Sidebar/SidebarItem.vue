<template>
  <div>
    <el-menu
      background-color="#19adf0" 
      text-color="#fff"
      active-text-color="#fff"
      >

<!--       <el-submenu index="1" v-for="item in routes"  v-if="item.meta && item.meta.title && item.children && item.children.length>1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.meta.title}}</span>
        </template>
        <router-link  v-for="child in item.children" :to="item.path+'/'+child.path" :key="child.name">
          <el-menu-item index="2" >{{child.meta.title}}</el-menu-item>
          </router-link>
      </el-submenu> -->
      <router-link  v-for="item in routes" v-if="item.children && item.children.length>=1" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>
<script>

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
  created () {
  }
}
</script>