<template>
  <div class="navbar">
    <div class="nav_left">
      <logo v-if="showLogo" :collapse="false" />
      <product-menu id="product_container" class="product_container" :show="showProductOption"
        @toggle="handle_product" />
      <hamburger id="hamburger_container" :is-active="sidebar.opened" class="hamburger_container"
        @toggleClick="toggleSideBar" />
      <TopNavigation />
    </div>

    <div class="navbar_right">
      <template v-if="device!=='mobile'">
        <!-- <error-log class="errLog-container navbar_right-item hover-effect" /> -->
        <screenfull id="screenfull" class="navbar_right-item hover-effect" />
      </template>
      <Project class="navbar_right-item hover-effect" v-if="showProject" />

      <el-dropdown class="avatar-container navbar_right-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <i class="iconfont icon-smile" style="font-size: 28px;" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 产品列表 v-if="showProductOption"  -->
    <ProductOption :show="showProductOption" @go="handle_go" @modal="handle_product" />
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Logo from './Logo'
  // import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  // import ErrorLog from '@/components/ErrorLog'
  import Screenfull from '@/components/Screenfull'
  import ProductMenu from '@/components/ProductMenu'
  import ProductOption from '@/components/ProductMenu/_part/product_option.vue'
  import Project from './Project'
  import TopNavigation from './TopNavigation'
  import {
    USERS_PRODUCT_NAVIGATION
  } from '@/constant'

  export default {
    components: {
      // Breadcrumb,
      Hamburger,
      // ErrorLog,
      Screenfull,
      ProductMenu,
      Logo,
      ProductOption,
      Project,
      TopNavigation,
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'device'
      ]),
      showLogo() {
        return this.$store.state.settings.sidebarLogo
      },
      isCollapse() {
        return !this.sidebar.opened
      },
      showProject() {
        const moduleEn = this.$route.meta.moduleEn
        return moduleEn !== USERS_PRODUCT_NAVIGATION.overview.en
      }
    },
    data() {
      return {
        showProductOption: false, // 展示产品地图
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      /**
       * 打开|关闭 产品导航地图
       */
      handle_product() {
        this.showProductOption = !this.showProductOption
      },
      /**
       * 前往某个产品模块
       */
      handle_go(str) {
        this.showProductOption = false
        console.log(str)
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/var.scss";

  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: $darkMain;
    color: $darkSub;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .nav_left {
      float: left;
      display: flex;
      height: 100%;
      line-height: 50px;

      .hamburger_container {
        line-height: 46px;
        height: 100%;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
          background: #5a5e66;
        }
      }

      .product_container {
        line-height: 46px;
        height: 100%;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
          background: #5a5e66;
        }
      }

      .breadcrumb-container {
        float: left;
      }

      .errLog-container {
        display: inline-block;
        vertical-align: top;
      }
    }

    .navbar_right {
      float: right;
      display: flex;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .navbar_right-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 16px;
        color: $darkSub;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: #5a5e66;
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          // margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
