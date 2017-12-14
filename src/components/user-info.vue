<template lang="html">
  <div class="user-info">
    <!-- 未登录 -->
    <div class="login-no" v-if="(!userInfo)||(!userInfo.loginname)" >
      <div class="login" @click="goEnter"><span class="icon-circle-right"></span>
        <span>登录</span></div>
    </div>
    <!-- 已登录 -->
    <div class="login-yes"  @click="goUser" v-if="userInfo && userInfo.loginname">
      <div class="left-col">
        <div class="avatar">
          <img class="avatar-img" :src="userInfo.avatar_url" v-if="userInfo.avatar_url" width="40" height="40">
        </div>
        <div class="info">
          <p v-if="userInfo.loginname">{{userInfo.loginname}}</p>
        </div>
      </div>
      <div class="right-col">
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
  </div>

</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  },
  methods: {
    goEnter () {
      this.$router.push({
        name: 'login',
        query: {
          redirect: encodeURIComponent(this.$route.path)
        }
      })
      console.log('Go Enter', this.userInfo)
    },
    goUser () {
      this.$router.push({
        name: 'user',
        params: {
          loginname: this.userInfo.loginname
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .user-info {
    font-size: 0;
    .login-yes {
      display: flex;
      background: lightgray;
      .left-col {
        flex: 1;
        .avatar {
          flex: 1;
          .avatar-img {
            border-radius: 50%;
          }
        }
        .info {
          display: inline-block;
          vertical-align: top;
          font-size: 14px;
        }
      }
      .right-col {
        .icon-keyboard_arrow_right {
          vertical-align: middle;
          color: lightblue;
          line-height: 60px;
          font-size: 50px;
        }
      }
    }
    .login-no {
      padding: 0 20px;
      font-size: 20px;
      color: pink;
      .icon-circle-right {
        padding-right: 25px;
        color: pink;
      }
    }
  }
</style>
