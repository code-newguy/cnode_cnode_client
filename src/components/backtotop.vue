<template lang="html">
  <div class="backtop" @click="backtop">
    <span class="icon-arrow-up"></span>
  </div>
</template>

<script>
export default {
  methods: {
    backtop () {
      this.$emit('backtop')
    }
  }
}
</script>

<style lang="scss">
.backtop {
  position: fixed;
  padding: 10px;
  bottom: 30px;
  right: 20px;
  font-size: 30px;
}
</style>
