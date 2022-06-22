/*
* author: ljx
* date: 2021-11-01
* fileName: index.vue
* description: 全部产品展示及入口路径配置（作为所以模块的跟路由，选不多于7项作为顶部导航菜单项）
*/


<script>

export default {
  name: 'ProductMenu',
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  props: {
    show: { type: Boolean, default: false },
  },
  data() {
    return {
      showProductOption: false, // 展示产品地图
    }
  },
  /* ------------------------ COMPUTED ------------------------ */

  /* ------------------------ WATCH ------------------------ */
  watch: {
  },
  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  mounted() {
  },
  created() {
  },
  /* ------------------------ METHODS ------------------------ */
  methods: {
    /**
     * 打开|关闭 产品导航地图
     */
    handle_product() {
      this.$emit('toggle')
    },
    /**
     * 切换 产品
     */
    handle_go(str) {
      this.showProductOption = false
      console.log(str)
    }
  }
}
</script>

<template>
  <div class="module_product_menu" @click.prevent.stop="handle_product">

    <div style="padding: 0 10px;">
       <svg class="product_icon" :class="{'is-active': show}" xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         viewBox="0 0 942 942" width="12" height="12" fill="currentColor">
         <path d="M464 144H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52
            268H212V212h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2
            16-16V160c0-8.8-7.2-16-16-16zm-52 268H612V212h200v200zM464 544H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16
            16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H212V612h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0
            8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H612V612h200v200z" fill="currentColor">
         </path>
       </svg>
    </div>

  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/var.scss";
.module_product_menu {
  position: inherit;
  .product_icon {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    &:hover {
      transform: rotate(45deg);
      transition: all .12s;
    }
  }
  .is-active {
    transform: rotate(45deg);
  }
}
</style>