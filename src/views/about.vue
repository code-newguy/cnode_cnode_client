<template lang="html">
  <div class="aboutview">
    <nvheader pageType="关于"></nvheader>
    <div class="text">
      cnode的客户端 wirtten by code-newguy
    </div>
  </div>
</template>

<script>
import nvheader from '../components/header.vue'
export default {
  components: {
    nvheader
  }
}
</script>

<style lang="scss">
  .aboutview {
    .text {
      margin-top: 40px;
      text-align: center;
      font-size: 18px;
    }
  }
</style>
