<template>
  <svg
    :class="[classData ? 'svgicon' : 'svgneed', 'icon-base']"
     aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    classData: {
      type: Boolean,
      default:true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.icon-base
  fill: currentColor
  overflow: hidden
.svgicon
  width: 14px
  height: 14px
.svgneed
  width:20px
  height:20px
  vertical-align:-4px
  margin-right:5px
  fill:red
</style>

