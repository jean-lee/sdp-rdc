/*
* author: ljx
* date: 2021-12-16
* fileName: index.vue
* description: 顶部导航
*/

<script>
  import {
    USERS_PRODUCT_NAVIGATION
  } from '@/constant'
  import {
    mapGetters
  } from 'vuex'
  const menuOptions = Object.values(USERS_PRODUCT_NAVIGATION)

  export default {
    name: 'TopNavigation',
    /* ------------------------ INPUT & OUTPUT ------------------------ */
    data() {
      return {
        menuOptions,
        active: null
      }
    },
    /* ------------------------ COMPUTED ------------------------ */
    computed: {
      ...mapGetters([
        'topNavigationActive'
      ])
    },
    /* ------------------------ WATCH ------------------------ */
    watch: {
      topNavigationActive: {
        // immediate: true,
        deep: true,
        handler: function(val) {
          if (!val) return false
          this.active = val
        }
      }
    },
    /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
    created() {
      const moduleEn = USERS_PRODUCT_NAVIGATION[this.$route.meta.moduleEn]

      this.$store.dispatch('user/update_top_navagation_active', moduleEn)
    },
    /* ------------------------ METHODS ------------------------ */
    methods: {
      /**
       * 切换模块
       */
      handle_click(info) {
        this.active = info
        this.$store.dispatch('user/update_top_navagation_active', info)
        this.$router.push({
          name: info.en
        })
      }
    }
  }
</script>

<template>
  <div class="module_top_navigation">
    <ul class="user_navigation_wrapper" v-if="active">
      <template v-for="(item, index) of menuOptions">
        <li :key="index" :class="['item', { active: item.en === active.en }]" v-if="!item.hidden"
          @click="handle_click(item)">
          {{item.label}}
        </li>
      </template>
    </ul>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/var.scss";

  .module_top_navigation {
    .user_navigation_wrapper {
      display: flex;
      max-width: 380px;
      overflow-x: auto;

      .item {
        margin-right: 12px;
        font-size: 16px;
        cursor: pointer;

        &:hover {
          color: rgba(24, 144, 255, 0.6);
        }
      }

      .active {
        color: rgba(24, 144, 255, 1);
      }
    }
  }
</style>
