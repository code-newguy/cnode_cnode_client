<template lang="html">
  <div class="footer">
    <span class="step icon-backward2" @click="nextStep(false)"></span>
      <ul class="totalitem">
          <span v-for="(num, index) in listPages" class="item" :key="index"
          :class="{'chosen': num === chosenNum}" @click="jumpTo(num)">
            {{num}}
          </span>
      </ul>
    <span class="step icon-forward3" @click="nextStep(true)"></span>
  </div>
</template>

<script>
export default {
  props: {
    pageLength: {
      type: Number,
      default: 5
    },
    start: {
      type: Number,
      default: 1
    },
    chosenNum: {
      type: Number,
      default: 1
    }
  },
  computed: {
    listPages () {
      let pages = []
      for (let i = 0; i < this.pageLength; i++) {
        pages[i] = (this.start || 1) + i
      }
      return pages
    }
  },
  methods: {
    jumpTo (num) {
      this.$emit('jumpToPage', num)
    },
    nextStep (right) {
      this.$emit('nextStep', right)
      console.log('start', this.start, this.chosenNum)
    }
  }
}
</script>

<style lang="scss">
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  background: lightgray;
  text-align: center;
  .totalitem {
    width: 60%;
    font-size: 0;
    display: flex;
    .item {
      flex: 1;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      &.chosen {
        color: white;
        background: black;
      }
    }
  }
  .step {
    flex: 1;
    line-height: 30px;
  }
  .movebox {
    position: absolute;
  }
}
</style>
