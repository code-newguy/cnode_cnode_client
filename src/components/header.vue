<template lang="html">
<div class="">
  <div class="page-cover" @click.self="closeMenus" v-if="show">
  </div>
  <div :class="{'show': show}" id="hd">
    <div class="nv-toolbar">
      <div class="toolbar-nav " @click="openMenu">
        <span class="icon-menu"></span>
      </div>
      <span class="header-content">{{pageType}}</span>
      <span class="">{{messageCount}}</span>
      <span class="icon-compass" @click="goToAdd"></span>
    </div>
  </div>
  <nv-menu @closeMenu="closeMenus" v-show="show" ></nv-menu>
</div>
</template>

<script>
import menu from './menu.vue'
import '../assets/scss/CV.scss'
export default {
  data () {
    return {
      show: false
    }
  },
  props: {
    pageType: String,
    messageCount: Number,
    scrollTop: 0,
    needAdd: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    closeMenus () {
      console.log('closeMenus')
      this.show = false
    },
    openMenu () {
      this.show = true
    },
    goToAdd () {
      console.log('add')
      this.$router.push({
        name: 'add'
      })
    }
  },
  components: {
    'nv-menu': menu
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/mixin.scss';
  .page-cover {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9;
    background: rgba(0,0,0,0.4);
  }
  #hd {
    @include border-1px(gray);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 2;
    .nv-toolbar {
      line-height: 40px;
      display: flex;
      .icon-menu{
        line-height: 40px;
        margin-left: 10px;
        vertical-align: middle;
        font-size: 30px;
        display: inline-block;
      }
      .header-content {
        flex: 1;
        display: inline-block;
        text-align: center;
      }
      .icon-compass {
        padding: 10px;
        display: inline-block;
      }
    }
  }
</style>
