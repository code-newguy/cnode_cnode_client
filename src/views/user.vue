<template lang="html">
  <div class="user-page">
    <nvheader pageType="个人信息" :fix-head="true"></nvheader>
    <div class="page-top">
      <div class="user-avatar">
        <img :src="userData.avatar_url" width="100" height="100" class="img">
      </div>
      <div class="right-col">
        <div class="name">
          登录名:{{userData.loginname}}
        </div>
        <div class="time">
          创建时间:{{userData.create_at | returnTimeAgo}}
        </div>
        <div class="score">
          分数:{{userData.score}}
        </div>
      </div>
    </div>
    <div class="tab">
      <div class="recent-reply" :class="{'chosen': show}" @click="choseClass(1)">
        最近回复
      </div>
      <div class="recent-topic" :class="{'chosen': !show}" @click="choseClass(2)">
        最近发布
      </div>
    </div>
    <div class="tab-info">
      <ul>
        <li class="tab-item" v-for="item in currentData">
          <div class="tab-img">
            <img class="pic" :src="item.author.avatar_url" width="40" height="40"></div>
          <div class="right-col">
            <div class="title">
              {{item.title}}
            </div>
            <div class="name">
              {{item.author.loginname}}
            </div>
          </div>
          <div class="time">
            {{item.last_reply_at | returnTimeAgo}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import nvheader from '../components/header'
import $ from 'webpack-zepto'
import {MilliSecondToDate} from '../libs/util'
export default {
  data () {
    return {
      userData: {},
      show: true,
      currentData: []
    }
  },
  filters: {
    returnTimeAgo (time) {
      return MilliSecondToDate(time)
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      let loginname = this.$route.params.loginname
      $.ajax({
        type: 'GET',
        url: `https://cnodejs.org/api/v1/user/${loginname}`,
        success: (res) => {
          console.log('res', res)
          if (res.success) {
            this.userData = res.data
          }
          this.currentData = this.userData.recent_replies
        }
      })
    },
    choseClass (type) {
      if (type === 1) {
        this.show = true
      } else {
        this.show = false
      }
      if (this.show) {
        this.currentData = this.userData.recent_replies
      } else {
        this.currentData = this.userData.recent_topics
      }
      console.log('Data', this.currentData)
    }
  },
  components: {
    nvheader
  }
}
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
.user-page {
  padding: 40px 0 0 0;
  .page-top {
    background: #C2C2C2;
    .user-avatar {
      display: inline-block;
      padding: 10px 20px 0 20px;
      .img {
        border-radius: 50%;
      }
    }
    .right-col {
      display: inline-block;
      vertical-align: top;
      padding: 15px 0 0 0;
      font-size: 0;
      .time {
        font-size: 20px;
        line-height: 30px;

      }
      .name {
        line-height: 30px;
        font-size: 20px;
      }
      .score {
        line-height: 30px;
        font-size: 20px;
      }
    }
  }
  .tab {
    display: flex;
    .recent-reply {
      flex: 1;
      font-size: 18px;
      &.chosen {
        @include border-1px(blue);
        background: pink;
      }
    }
    .recent-topic {
      flex: 1;
      font-size: 18px;
      &.chosen {
        @include border-1px(blue);
        background: pink;
      }
    }
  }
  .tab-info {
    padding: 10px 10px 0;
    font-size: 0;
    .tab-item {
      display: flex;
      padding: 10px 0;
      font-size: 0;
      @include border-1px(lightgray);
      .tab-img {
        padding-right: 10px;
        .pic {
          border-radius: 50%;
        }
      }
      .right-col {
        flex: 1;
        .title {
          line-height: 20px;
          font-size: 14px;
        }
        .name {
          line-height: 20px;
          font-size: 14px;
        }
      }
      .time {
        line-height: 20px;
        font-size: 14px;
        vertical-align: bottom;
        color: gray;
      }
    }
  }
}
</style>
