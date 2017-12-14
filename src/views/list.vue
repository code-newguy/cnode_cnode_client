<template lang="html">
  <div class="list-outer">
    <nvheader :pageType="getPageType()" ></nvheader>
    <div class="list-container" ref="listContainer">
      <ul>
        <li v-for="item in topics" class="item">
            <div class="line-top" @click="goTopic(item.id)">
              <div class="left-tag">
                <nvtag :tab="item.tab" :good="item.good" :top="item.top"></nvtag>
              </div>
              <div class="title">
                {{item.title}}
              </div>
            </div>
            <div class="line-down" >
              <img class="pic" :src="item.author.avatar_url" width="40" height="40">
              <div class="col1">
                <div class="name">
                  {{item.author.loginname}}
                </div>
                <div class="create-time">
                  {{item.create_at | returnTimeAgo}}
                </div>
              </div>
              <div class="col2">
                <div class="count-compare">
                  <span>{{item.reply_count}}/</span><span>{{item.visit_count}}</span>
                </div>
                <div class="last-reply">
                  {{item.last_reply_at | returnTimeAgo}}
                </div>
              </div>
            </div>
        </li>
      </ul>
    </div>
    <nvtop @backtop="backtop"></nvtop>
    <loading v-show="loadingshow"></loading>
    <nvfooter @jumpToPage="jumpToPage" @nextStep="nextStep" :start="start" :chosenNum="chosenNum"></nvfooter>
  </div>
</template>

<script>
import nvheader from '../components/header'
import Bscroll from 'better-scroll'
import {getTabInfo, MilliSecondToDate} from '../libs/util'
import nvtag from '../components/tag'
import loading from '../components/loading'
import nvtop from '../components/backtotop'
import nvfooter from '../components/listfooter'
import Vue from 'vue'
import $ from 'webpack-zepto'
export default {
  data () {
    return {
      params: {
        page: 1,
        tab: 'all',
        limit: 60,
        mdrender: true
      },
      topics: [],
      pageType: String,
      loadingshow: false,
      chosenNum: 1,
      start: 1
    }
  },
  filters: {
    returnTimeAgo (time) {
      return MilliSecondToDate(time)
    }
  },
  methods: {
    jumpToPage (num) {
      if (num > 0) {
        this.params.page = num
        this.chosenNum = num
        this.getTopics()
        this.backtop()
      }
    },
    goTopic (id) {
      this.$router.push({
        name: 'topic',
        params: {id: id}
      })
    },
    getPageType () {
      return getTabInfo(this.params.tab)
    },
    backtop () {
      this.scroll.scrollTo(0, 0, 50)
    },
    getTopics () {
      this.loadingshow = true
      if (this.$route.query.tab) {
        this.params.tab = this.$route.query.tab
      }
      this.receiveInfo()
    },
    receiveInfo () {
      $.ajax({
        url: 'https://cnodejs.org/api/v1/topics',
        data: $.param(this.params),
        type: 'GET',
        dataType: 'json',
        success: (res) => {
          this.loadingshow = false
          this.topics = res.data
        }
      })
    },
    nextStep (right) {
      if (right) {
        this.start = this.start + 5
        this.chosenNum = this.start
        this.jumpToPage(this.chosenNum)
      } else {
        this.start = this.start - 5
        this.start = (Number(this.start) < 1) ? 1 : this.start
        this.chosenNum = this.start
        this.jumpToPage(this.chosenNum)
      }
    }
  },
  mounted () {
    let pagenum = Number(window.sessionStorage.page) || 1
    // 当时从topic页面返回时 pagenum有值 不为空 如果为空 则赋值为1 这样是为了 返回时页码跟原来一样
    let start = (parseInt(pagenum / 5)) * 5 + 1
    if (start >= pagenum) {
      start = (start - 5) < 0 ? 1 : (start - 5)
    }
    Vue.set(this, 'start', start)
    Vue.set(this, 'chosenNum', pagenum)
    this.params.page = pagenum
    this.getTopics()
    // 当从topic页面返回时 保持在原来的位置
    this.$nextTick(() => {
      let scrollY = Number(window.sessionStorage.scrollY)
      this.scroll = new Bscroll(this.$refs.listContainer, {
        click: true,
        startY: scrollY || 0
      })
    })
  },
  beforeRouteLeave (to, from, next) {
    // 如果去topic页面 保存 y轴位置 和 page的页码
    if (to.name === 'topic') {
      window.sessionStorage.scrollY = this.scroll.y
      let page = this.params.page
      window.sessionStorage.page = page
    }
    next()
  },
  beforeRouteEnter (to, from, next) {
    if (from.name !== 'topic') {
      window.sessionStorage.removeItem('scrollY')
      window.sessionStorage.removeItem('page')
    }
    next()
  },
  watch: {
    '$route' (to, from) {
      let tab = to.query.tab
      // 如果是切换tab 且不是从topic页面返回
      if (tab && (from.name !== 'topic')) {
        this.params.tab = tab
        this.params.page = 1
        Vue.set(this, 'chosenNum', 1)
        Vue.set(this, 'start', 1)
        this.backtop()
        this.getTopics()
      }
    }
  },
  components: {
    nvheader,
    nvtag,
    nvtop,
    loading,
    nvfooter
  }
}
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
.list-outer {
  .list-container {
    position: absolute;
    top: 44px;
    left: 0;
    bottom: 30px;
    width: 100%;
    overflow: hidden;
    .item {
      padding: 10px 10px 15px;
      @include border-1px(gray);
      .line-top {
        display: flex;
        flex-warp: nowrap;
        .left-tag {
          flex: 0 1 40px;
          min-width: 40px;
        }
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 16px;
          font-weight: 600;
          vertical-align: top;
          padding-left: 10px;
        }
      }
      .line-down {
        display: flex;
        .pic {
          border-radius: 50%;
        }
        .col1 {
          display: inline-block;
          .name {
            font-size: 14px;
          }
          .create-time {
            font-size: 13px;
          }
        }
        .col2 {
          display: inline-block;
          flex: 1;
          text-align: right;
          .count-compare {
            font-size: 14px;
          }
          .last-reply {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>
