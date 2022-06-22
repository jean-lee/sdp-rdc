<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <div :class="['header-wrapper', {'fixed-header':fixedHeader}]">
      <navbar />
    </div>

    <sidebar class="sidebar-container" />
    <div class="main-container">
      <!-- <tags-view v-if="needTagsView" /> -->
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>

  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    // TagsView,
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: false, // state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    isCollapse() {
      return !this.sidebar.opened
    },
    classObj() {
      return {
        hasTagsView: this.needTagsView,
        hasLogo: this.$store.state.settings.sidebarLogo,
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/var.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1002;
  width: 100%;
}

.openSidebar {
  .tags-view-container {
    margin-left: #{$sideBarWidth};
    transition: margin-left .28s;
  }
}

.hideSidebar {
  .tags-view-container {
    margin-left: 54px;
    transition: margin-left .28s;
  }
}
.mobile {
  .tags-view-container {
    margin-left: 0;
    transition: margin-left .28s;
  }
}

</style>
