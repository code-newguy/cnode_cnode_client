<template lang="html">
  <transition name="move-menu">
  <section id="sideBar" class="nav-list">
    <user-info></user-info>
    <ul class="list-ul">
      <li class="item" @click="closeMenu"><span class="icon-menu item-icon"></span><router-link class="text" :to="{ name: 'list', query: {tab: 'all'} }">全部</router-link></li>
      <li class="item"@click="closeMenu"><span class="icon-thumb_up item-icon"></span><router-link class="text" :to="{ name: 'list', query: {tab: 'good'}  }">精华</router-link></li>
      <li class="item"@click="closeMenu"><span class="icon-share2 item-icon"></span><router-link class="text" :to="{ name: 'list', query: {tab: 'share'}  }">分享</router-link></li>
      <li class="item"@click="closeMenu"><span class="icon-bubbles4 item-icon"></span><router-link class="text" :to="{ name: 'list', query: {tab: 'ask'}  }">问答</router-link></li>
      <li class="item"@click="closeMenu"><span class="icon-users item-icon"></span><router-link class="text" :to="{ name: 'list', query: {tab: 'job'}  }">招聘</router-link></li>
      <li class="item"@click="closeMenu"><span class="icon-users item-icon"></span><router-link class="text" :to="{ name: 'list', query: {tab: 'dev'}  }">测试</router-link></li>
      <li class="item"@click="closeMenu"><span class="icon-envelop item-icon"></span><router-link class="text" :to="{ name: 'message'}">消息</router-link></li>
      <li class="item"@click="closeMenu"><span class="icon-info item-icon"></span><router-link class="text" :to="{ name: 'about' }">关于</router-link></li>
    </ul>
  </section>
</transition>
</template>
<script>
import userInfo from './user-info.vue'
export default {
  replace: true,
  data () {
    return {
    }
  },
  props: [
  ],
  methods: {
    closeMenu () {
      console.log('closeMenu')
      this.$emit('closeMenu')
    }
  },
  components: {
    userInfo
  }
}
</script>

<style lang="scss">
  .nav-list {
    position: fixed;
    top: 0;
    left: 0;
    width: 45%;
    height: 100%;
    background: #fff;
    color: #313131;
    z-index: 99;
    &.move-menu-enter, &.move-menu-leave-to {
      transform: translateX(-100%);
    }
    &.move-menu-enter-active, &.move-menu-leave-active{
      transition: all 0.5s ease;
    }
    &.move-menu-enter-to, &.move-menu-leave {
      transform: translateX(0);
    }
    .list-ul {
      margin: 0 24px;
      overflow: hidden;
      padding-top: 9%;
      .item {
        display: block;
        font-size: 15px;
        font-weight: 200;
        text-align: left;
        line-height: 40px;
        color: #313131;
        .item-icon {
          line-height: 40px;
          font-size: 18px;
        }
        .text {
          padding-left: 35px;
          font-size: 18px;
          font-weight: 400;
        }
      }
    }
  }
</style>
