<template>
 <div class="container">
  <zi-header></zi-header>
  <zi-tab :dialogVisible="dialogVisible" @close="close"></zi-tab>
</div>
</template>
<script>
import {lotteryRouterMixin} from 'common/js/mixin'

export default {
  mixins: [lotteryRouterMixin]
}
</script>