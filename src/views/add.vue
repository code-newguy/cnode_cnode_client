<template lang="html">
  <div class="addTopic">
    <nvheader pageType="主题"></nvheader>
    <div class="top">
      <span>选择分类</span>
      <select class="option" v-model="topic.tab">
        <option value="dev" selected="selected">测试</option>
        <option value="job">招聘</option>
        <option value="ask">问答</option>
        <option value="share">分享</option>
      </select>
      <button class="send" @click="send">发布</button>
    </div>
    <div class="title">
      <input type="text" name="" value="" placeholder="标题 至少5个字符" v-model="topic.title">
    </div>
    <div class="content">
      <textarea type="text" name="" value="" placeholder="回复支持Markdown语法 请注意代码标记"
      v-model="topic.content"  rows="35"></textarea>
    </div>
  </div>
</template>

<script>
import nvheader from '../components/header'
import $ from 'webpack-zepto'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      topic: {
        title: '',
        content: '',
        tab: ''
      }
    }
  },
  components: {
    nvheader
  },
  computed: {
    ...mapGetters({userInfo: 'getUserInfo'})
  },
  methods: {
    send () {
      this.topic.title = $.trim(this.topic.title)
      if (this.topic.title.length < 5) {
        alert('标题少于五个字符')
        this.topic.title = ''
        return
      }
      this.topic.content = $.trim(this.topic.content)
      let postData = {
        ...this.topic,
        accesstoken: this.userInfo.token
      }
      this.postData(postData)
    },
    postData (data) {
      $.ajax({
        url: 'https://cnodejs.org/api/v1/topics',
        type: 'POST',
        data: data,
        dataType: 'json',
        success: (res) => {
          this.$router.push({
            name: 'list'
          })
        },
        error: (res) => {
          let error = JSON.parse(res.response)
          alert(error.error_msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.addTopic {
  margin-top: 50px;
  padding: 0 10px;
  .top {
    .option {
      width: 30%;
      background: lightgray;
      option {
        padding: 0;
      }
    }
    .send {
      margin-left: 20px;
    }
  }
  .title {
    margin: 10px 0;
    input {
      width: 100%;
      line-height: 20px;
    }
    .send {
      float: right;
    }
  }
  .content {
    textarea {
      width: 100%;
      line-height: 20px;
    }
  }
}
</style>
