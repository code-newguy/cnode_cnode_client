<template lang="html">
  <div class="login-container">
    <nv-head page-type="登录" :fixHead="true"></nv-head>
    <div class="login-input">
      <input v-model="token" class="input-box" type="text" value="" placeholder="Access Token" maxlength="36" >
    </div>
    <div class="login">
      <button class="button" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import nvHead from '../components/header.vue'
import $ from 'webpack-zepto'
export default {
  data () {
    return {
      token: ''
    }
  },
  methods: {
    login () {
      console.log(this.token)
      if (this.token === '') {
        this.$alert('令牌格式错误 应为36位UUID字符串')
        return false
      }
      $.ajax({
        type: 'POST',
        url: 'https://cnodejs.org/api/v1/accesstoken',
        data: {
          accesstoken: this.token
        },
        dataType: 'json',
        success: (res) => {
          let user = {
            loginname: res.loginname,
            avatar_url: res.avatar_url,
            userId: res.id,
            token: this.token
          }
          window.sessionStorage.user = JSON.stringify(user)
          this.$store.dispatch('setUserInfo', user)
          let redirect = decodeURIComponent(this.$route.query.redirect || '/')
          this.$router.push({
            path: redirect
          })
        },
        error: (res) => {
          let error = JSON.parse(res.response)
          this.$alert(JSON.stringify(error.error_msg))
        }
      })
    }
  },
  components: {
    nvHead
  }
}
</script>

<style lang="scss">
.login-container {
  padding: 50px 10px;
  .login-input {
    input {
      padding: 10px 0;
      background: 	#ADADAD;
    }
  }
  .login {
    margin: 10px 0;
    .button {
      padding: 5px 70px;
      font-size: 14px;
    }
  }
}
</style>
