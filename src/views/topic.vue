<template lang="html">
  <div class="topic-container" v-if="dataFinish">
    <nv-head pageType="主题"   ></nv-head>
    <div class="container" ref="container">
      <div class="container-inside">
        <div class="topic-content " >
          <div class="title">
            {{topic.title}}
          </div>
          <div class="user-info">
            <img :src="topic.author.avatar_url" width="40" height="40" class="avatar-img">
            <div class="left-col">
              <div class="username">
                {{topic.author.loginname}}
              </div>
              <div class="create-time">
                发布于:{{topic.create_at | returnTimeAgo}}
              </div>
            </div>
            <div class="right-col">
              <div class="visit-count">
                {{topic.visit_count}}次浏览
              </div>
              <nvtag class="tag-item":good="topic.good" :top="topic.top" :tab="topic.tab"></nvtag>
            </div>
          </div>
          <div class="content markdown-body" v-html="topic.content">
          </div>
        </div>
        <div class="reply-count">
          总回复:  {{topic.replies.length}}
        </div>
        <div class="reply-list" v-if="topic.replies">
          <ul>
            <li v-for="(reply,index) in topic.replies" :key="index">
              <div class="reply-container">
                <div class="reply-top">
                  <img class="reply-img":src="reply.author.avatar_url" width="30" height="30">
                  <div class="left-col">
                    <span class="loginname">{{reply.author.loginname}}</span>
                    <span class="create_time">{{reply.create_at | returnTimeAgo}}</span>
                  </div>
                  <div class="right-col">
                    <span class="icon-thumb_up" :class="{ 'up': isUps(reply.ups)}" @click="increaseUp(reply)">{{reply.ups.length}}</span>
                    <span class="icon-undo2" @click="toggleReply(reply.id)" ></span>
                  </div>
                </div>
                <div class="reply-content"v-html="reply.content"></div>
                <nvReply v-if="reply.id === curReplyId && onlyShow" :replyId="reply.id"
                :replyUser="reply.author.loginname" @addReply="addReply"></nvReply>
              </div>
            </li>
            <nvReply @addReply="addReply" ></nvReply>
          </ul>
        </div>
      </div>
    </div>
  <nvtop @backtop="backtop"></nvtop>
  </div>
</template>

<script>
import nvHead from '../components/header.vue'
import Bscroll from 'better-scroll'
import nvtag from '../components/tag'
import loading from '../components/loading'
import {MilliSecondToDate} from '../libs/util.js'
import nvReply from '../components/reply.vue'
import nvtop from '../components/backtotop'
import {mapGetters} from 'vuex'
import $ from 'webpack-zepto'
const markdown = require('markdown').markdown
export default {
  data () {
    return {
      topic: {},
      noData: false,
      topicId: '',
      curReplyId: '',
      onlyShow: false,
      dataFinish: false
    }
  },
  methods: {
    getContent (content) {
      let htmlText = markdown.toHTML(content)
      let replyContent = $('<div class="markdown-text"></div>').append(htmlText)[0].outerHTML
      return replyContent
    },
    increaseUp (reply) {
      if (!this.userInfo || !this.userInfo.userId) {
        this.$router.push({
          name: 'login',
          params: {
            redirect: encodeURIComponent(this.$route.path)
          }
        })
      } else {
        $.ajax({
          type: 'POST',
          url: 'https://cnodejs.org/api/v1/reply/' + reply.id + '/ups',
          data: {
            accesstoken: this.userInfo.token
          },
          dataType: 'json',
          success: (res) => {
            if (res.success) {
              if (res.action === 'down') {
                let index = $.inArray(this.userInfo.userId, reply.ups)
                reply.ups.splice(index, 1)
              } else {
                reply.ups.push(this.userInfo.userId)
              }
            }
          },
          error: (res) => {
            let error = JSON.parse(res.responseText)
            this.$alert(error.error_msg)
            return false
          }
        })
      }
    },
    addReply (content) {
      let time = new Date()
      let replyId = this.onlyShow ? this.curReplyId : null
      if (!this.userInfo || !this.userInfo.token) {
        this.$router.push({
          name: 'login',
          params: {
            redirect: encodeURIComponent(this.$route.path)
          }
        })
        return
      }
      let postdata = {
        accesstoken: this.userInfo.token,
        content: content,
        reply_id: replyId
      }
      $.ajax({
        type: 'POST',
        url: `https://cnodejs.org/api/v1/topic/${this.topicId}/replies`,
        dataType: 'json',
        data: postdata,
        success: (res) => {
          this.curReplyId = res.reply_id
          var upItem = {
            create_at: time,
            id: res.reply_id,
            author: {
              avatar_url: this.userInfo.avatar_url,
              loginname: this.userInfo.loginname
            },
            ups: [],
            is_uped: false,
            content: this.getContent(content),
            reply_id: replyId
          }
          this.topic.replies.push(upItem)
          this.topicscroll.refresh()
        },
        error: (res) => {
          alert(res.response)
        }
      })
      if (this.onlyShow) {
        this.onlyShow = false
      }
    },
    isUps (ups) {
      if (!this.userInfo || !this.userInfo.userId) {
        return false
      }
      return $.inArray(this.userInfo.userId, ups) >= 0
    },
    toggleReply (id) {
      this.curReplyId = id
      this.onlyShow = !this.onlyShow
    },
    getTopic () {
      this.topicId = this.$route.params.id
      $.ajax({
        url: 'https://cnodejs.org/api/v1/topic/' + this.topicId,
        type: 'GET',
        success: (d) => {
          if (d && d.data) {
            this.topic = d.data
            this.dataFinish = true
          } else {
            this.noData = true
          }
        }
      })
    },
    _initscroll () {
      this.topicscroll = new Bscroll(this.$refs.container, {
        click: true
      })
    },
    backtop () {
      this.topicscroll.scrollTo(0, 0, 50)
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  },
  created () {
    this.getTopic()
  },
  watch: {
    dataFinish: function () {
      this.$nextTick(() => {
        this._initscroll()
      })
    }
  },
  filters: {
    returnTimeAgo (time) {
      return MilliSecondToDate(time)
    }
  },
  components: {
    nvHead,
    nvtag,
    nvReply,
    nvtop,
    loading
  }
}
</script>

<style lang="scss">
$bordercolor: #d5dbdb;
@import '../assets/scss/mixin.scss';
.topic-container {
  .container {
    position: absolute;
    top: 45px;
    left: 0;
    bottom: 0;
    overflow: hidden;
    width: 100%;
    padding: 0 10px;
    .topic-content {
      .title {
        background: #CDC5BF;
        font-size: 20px;
        font-weight: 600;
        border-radius: 8px;
      }
      .user-info {
        margin-top: 15px;
        display: flex;
        .avatar-img {
          border-radius: 50%;
          margin-right: 10px;
        }
        .left-col {
          flex: 1;
          line-height: 40px;
          .username {
            line-height: 20px;
            vertical-align: top;
            font-size: 15px;
          }
          .create-time {
            line-height: 20px;
            vertical-align: top;
            font-size: 14px;
          }
        }
        .right-col {
          .visit-count {
            text-align: right;
            line-height: 20px;
            font-size: 14px;
          }
          .tag-item {
            width: 100%;
          }
        }
      }
      .content {
        padding: 10px 0 0 0;
      }
    }
    .reply-count {
      line-height: 40px;
      background: #BEBEBE;
      @include border-1px(black);
    }
    .reply-list {
      .reply-container {
        .reply-top {
          display: flex;
          padding-top: 10px;
          .reply-img {
            line-height: 30px;
          }
          .left-col {
            flex: 1;
            font-size: 0;
            .loginname {
              line-height: 15px;
              font-size: 14px;
            }
            .create_time {
              display: block;
              line-height: 15px;
              font-size: 14px;
            }
          }
          .right-col {
            line-height: 30px;
            .icon-thumb_up {
              padding: 3px;
              &.up {
                color: blue;
              }
            }
            .icon-undo2 {
              padding: 2px;
            }
          }
        }
        .reply-content {
          @include border-1px(black);
          padding-bottom: 10px;
        }
      }
    }

  }
  }
</style>
