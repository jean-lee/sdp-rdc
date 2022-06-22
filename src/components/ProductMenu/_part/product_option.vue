/*
* author: ljx
* date: 2021-11-03
* fileName: product_map_dialog.vue
* description: 产品地图
*/


<script>
import {
  PRODUCT_ALL, // 所有产品
  PRODUCT_AUXILIARY, // 附属模块
} from '@/constant'

const optionPro = Object.values(PRODUCT_ALL)
const optionAux = Object.values(PRODUCT_AUXILIARY)

export default {
  name: 'ProductOption',
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  props: {
    show: { type: Boolean, default: false },
  },
  data() {
    return {
      productOption: optionPro,
      auxiliaryOption: optionAux,
    }
  },
  /* ------------------------ COMPUTED ------------------------ */
  /* ------------------------ WATCH ------------------------ */
  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  /* ------------------------ METHODS ------------------------ */
  methods: {
    /**
     * 切换产品
     */
    handle_go(str) {
      this.$emit('go', str)
    },
    /**
     * 切换产品
     */
    handle_modal(str) {
      this.$emit('modal', str)
    },
  }
}

</script>

<template>
<div :class="['dialog-product_option', {hide: !show}]">
  <div class="v-modal" @click="handle_modal" v-if="show"></div>
  <div class="module_product_option">
  <!-- 产品列表 -->
  <div class="block">
    <div class="wrapper" v-for="(opti, index) of productOption" :key="index">
      <p class="header"><i :class="opti.icon"></i>{{ opti.label }}</p>
      <ul class="content">
        <li class="item" v-for="child in opti.children" :key="child.value" @click.prevent.stop="handle_go(child)">
          <i :class="child.icon"></i>
          <span>{{ child.label }}</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- 附属 操作 -->
  <div class="block">
    <div class="wrapper no-float" v-for="(opti, index) of auxiliaryOption" :key="index">
      <p class="header"><i :class="opti.icon"></i>{{ opti.label }}</p>
      <ul class="content">
        <li class="item" v-for="child in opti.children" :key="child.value" @click="handle_go(child)">
          <i :class="child.icon"></i>
          <span>{{ child.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/var.scss";


.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  opacity: 0;
  background: #000;
}
.dialog-product_option {
  // width: 520px;
  // width: 100vw;
  // height: 100vh;
  // opacity: 1;
  z-index: 1002;


  .module_product_option {
    position: fixed;
    top: 50px;
    left: 0;
    width: 520px;
    height: 100%;
    opacity: 1;
    overflow: hidden;
    background: #202020;
    transition: all 0.28s;
    transform-origin: left top;
    .block {
      padding: 6px 24px 12px;
      user-select: none;
      @include clearfix;
      .wrapper {
        float: left;
        width: 50%;
        box-sizing: content-box;
      }
      .no-float {
        float: none;
      }
      .header {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: 700;
        color: #fff;
        i {
          margin-right: 6px;
          font-size: 22px;
        }
      }
      .content {
        padding-left: 28px;
        .item {
          height: 32px;;
          line-height: 32px;
          color: #fff;
          cursor: pointer;
          i {
            margin-right: 6px;
            font-size: 16px;
          }
          span {
            font-size: 14px;
          }
          &:hover {
            color: #2d8cf0;
          }
        }
      }
    }
  }
}

.hide {
  z-index: -1;
  .module_product_option {
    height: 0;
    width: 0;
    opacity: 0;
    transition: all 0.28s;
  }
}
</style>
