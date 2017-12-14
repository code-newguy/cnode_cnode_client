<template lang="html">
  <div class="loading">
  </div>
</template>

<script>
export default {
  props: {
  }
}
</script>

<style lang="scss">
.loading {
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: #fff url('../assets/images/loading.gif') no-repeat center 250px;
}
</style>
