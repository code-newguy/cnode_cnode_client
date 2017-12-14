<template lang="html">
  <div class="message-container">
    <nvheader pageType="消息" :fixHead="true"></nvheader>
    <div class="tab">
      <span :class="{'chosen': show}" @click="changeClass(1)" class="tab-item">已读消息</span><span :class="{'chosen': !show}" @click="changeClass(2)" class="tab-item">未读消息</span>
    </div>
    <div class="tab-info">
      <ul>
        <li v-for="item in currentData">
          <div class="info-top">
            <div class="img">
              <img :src="item.author.avatar_url" alt="" width="30" height="30">
            </div>
            <div class="name" v-if="">
              {{item.author.loginname}} 回复了您的话题
            </div>
            <div class="time">
              {{item.create_at | returnTimeAgo}}
            </div>
          </div>
          <div class="title">
            标题: {{item.topic.title}}
          </div>
          <div class="content"><p>回复内容: </p>
            <p v-html="item.reply.content"></p>
          </div>
        </li>
      </ul>
      <div class="noInfo" v-show="currentData.length === 0">
        暂无回复
      </div>
    </div>
  </div>
</template>

<script>
import {MilliSecondToDate} from '../libs/util'
import nvheader from '../components/header'
import $ from 'webpack-zepto'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      dataInfo: {},
      currentData: [],
      choseNum: Number,
      show: true
    }
  },
  filters: {
    returnTimeAgo (time) {
      return MilliSecondToDate(time)
    }
  },
  mounted () {
    this.getInfo()
  },
  computed: {
    ...mapGetters({userInfo: 'getUserInfo'})
  },
  methods: {
    getInfo () {
      let data = {
        accesstoken: this.userInfo.token,
        mdrender: true
      }
      $.ajax({
        url: 'https://cnodejs.org/api/v1/messages',
        dataType: 'json',
        data: data,
        success: (res) => {
          console.log(res)
          this.dataInfo = res.data
          this.currentData = this.dataInfo.has_read_messages
        },
        error: (res) => {
          console.log('error', res)
        }
      })
    },
    changeClass (type) {
      if (type === 1) {
        this.show = true
        this.currentData = this.dataInfo.has_read_messages
      } else {
        this.show = false
        this.currentData = this.dataInfo.hasnot_read_messages
      }
    }
  },
  components: {
    nvheader
  }
}
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
.message-container {
  padding-top: 40px;
  .tab {
    display: flex;
    line-height: 40px;
    font-size: 20px;
    .tab-item {
      text-align: center;
      flex: 1;
      @include border-1px(gray);
      border-right: 1px solid gray;
      &:last-child {
        border-right: none;
      }
      &.chosen {
        color: white;
        background: gray;
      }
    }
  }
  .tab-info {
    padding: 5px 10px;
    font-size: 0;
    .info-top {
      padding-bottom: 10px;
      .img {
        display: inline-block;
      }
      .name {
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
      }
      .time {
        display: inline-block;
        float: right;
        font-size: 12px;
        color: green;
      }
    }
    .title {
      font-size: 14px;
      font-weight: 800;
    }
    .content {
      font-size: 12px;
      background: lightgray;
      margin-bottom: 15px;
    }
    .noInfo {
      font-size: 18px;
      text-align: center;
    }
  }
}
</style>
