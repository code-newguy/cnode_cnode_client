<template lang="html">
  <div class="tag-info" :class="getTabStr(true)">{{getTabStr(false)}}
  </div>
</template>

<script>
import {getTabInfo} from '../libs/util.js'
export default {
  props: {
    tab: String,
    good: Boolean,
    top: Boolean
  },
  methods: {
    getTabStr (isClass) {
      return getTabInfo(this.tab, this.good, this.top, isClass)
    }
  }
}
</script>

<style lang="scss">
.tag-info {
  display: block;
  width: 100%;
  font-size: 14px;
  background: #e7e7e7;
  text-align: center;
  border-radius: 5px;
  line-height: 20px;
  color: #fff;
  &.top {
      background: pink;
  }
  &.ask {
      background: #3498DB;
  }
  &.good {
      background: #E67E22;
  }
  &.job {
      background: #9B59B6;
  }
  &.share {
      background: #1ABC9C;
  }
  &.test {
    background: lightgreen;
  }
}
</style>
