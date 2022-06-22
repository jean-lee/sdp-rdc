<template>
  <div class="module-sidebar" :class="{'has-logo':showLogo}">
    <!-- <div class="project_title">
      <i class="el-icon-takeaway-box" />
      <span v-if="!isCollapse">
        {{ topNavigationActive.en === 'overview' ? '项目空间' : topNavigationActive.label }}
      </span>
    </div> -->
    <el-scrollbar wrap-class="scrollbar-wrapper" :key="topNavigationActive.en">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/var.scss'

export default {
  components: { SidebarItem },
  created() {

  },
  watch: {
    topNavigationActive: {
      immediate: true,
      deep: true,
      handler: function(val) {
        // console.log('permission_routes: ', val, this.permission_routes[6].module)
        this.permission_routes.forEach((item, index, arr) => {
          if (item.module) {
            if (item.module !== val.en) {
              item.hidden = true
            } else {
              item.hidden = false
            }
          }
        })
        // console.log( this.permission_routes[6].hidden)
        this.$forceUpdate()
      }
    }
  },
  computed: {
    ...mapGetters([
      'topNavigationActive',
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return false // this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/var.scss";

.module-sidebar {
  width: #{$sideBarWidth};
}
.module-sidebar.collapse {
  width: 54px;
  // transition: margin-left .28s;
  // margin-left: $sideBarWidth;
  // /* 50= navbar  50  */
  // min-height: calc(100vh - 50px);
  // // width: 100%;
  // width: calc(100% - #{$sideBarWidth});
  // position: relative;
  // overflow: hidden;
}
.project_title {
  padding: 0 20px;
  height: 56px;
  line-height: 56px;
  padding-left: 20px;
  color: rgb(187, 187, 187);
  background: #101014;
  font-size: 14px;
  font-weight: 700;
  user-select: none;
  i {
    margin-right: 6px;
    font-size: 18px;
    color: rgb(187, 187, 187);
  }
}
</style>