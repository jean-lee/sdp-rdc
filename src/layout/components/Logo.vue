<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '数据研发中心',
      logo: require('@/assets/logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/var.scss";

.sidebar-logo-container {
  float: left;
  position: relative;
  // width: #{$sidebarWidth};
  width: #{$sideBarWidth};
  height: 50px;
  line-height: 50px;
  // background: #2b2f3a;
  // text-align: left;
  overflow: hidden;

  & .sidebar-logo-link {
    text-align: inherit;
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      display: inline-block;
      margin-left: 12px;
      margin-right: 12px;
      width: 32px;
      height: auto;
      object-fit: fill;
      border-radius: 4px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }

}
</style>