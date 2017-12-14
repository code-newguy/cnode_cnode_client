<template lang="html">
  <div class="reply">
    <textarea placeholder='回复支持Markdown语法,请注意标记代码' class="text" rows="8" v-model="content">
    </textarea>
    <button type="button" class="submit-button" @click="addReply">确定</button>
  </div>
</template>

<script>
import nvHead from '../components/header.vue'
export default {
  data () {
    return {
      content: ''
    }
  },
  props: {
    replyId: {
      default: ''
    },
    replyUser: {
      default: ''
    }
  },
  mounted () {
    this.content = this.replyUser ? `@${this.replyUser} ` : ''
  },
  methods: {
    addReply () {
      console.log('addReply in reply')
      this.$emit('addReply', this.content)
      this.content = ''
    }
  },
  components: {
    nvHead
  }
}
</script>

<style lang="scss">
.reply {
  .text {
    width: 100%;
  }
  .submit-button {
    width: 100%;
    font-size: 16px;
    background: lightgray;
  }
}
</style>
