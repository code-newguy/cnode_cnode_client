<template lang="html">
  <div>
    <img src="../assets/images/index.png" alt="" class="index">
  </div>
</template>

<script>
require('../assets/scss/CV.scss')
export default {
  mounted () {
    setTimeout(() => {
      this.$router.push({
        name: 'list'
      })
    }, 1000)
  }
}
</script>

<style lang="scss">
  .index {
    width: 100%;
    background-color: #fff;
    margin-top: 40%;
  }
</style>
