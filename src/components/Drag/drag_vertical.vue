/*
* author: ljx
* date: 2020-12-24
* description: 可拖动改变高度的框架 纵向
*/

<script>

export default {
  name: 'BaseDragVertical',
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  props: {
    show: { type: Boolean, default: false },
    showDisplayHideBtn: { type: Boolean, default: true },
    showCloseBtn: { type: Boolean, default: false },
    slidebg: { type: String, default: '#3a3d51' },
    hideButtonPosition: { type: Object, default: () => { return { left: '50%' } } },
  },
  data() {
    return {
      areaShow: false, // 控制可拖动区域的 显示与隐藏
      areaDestroyed: false, // 销毁当前实例
      sidebarOldNum: null, // 鼠标按下时 可拖动区域的高度
      sidebarMousedownNum: null, // 鼠标按下时坐标Y轴
      dragNum: null,
    }
  },
  /* ------------------------ COMPUTED ------------------------ */

  /* ------------------------ WATCH ------------------------ */
  watch: {
    show: {
      immediate: true,
      handler: function(val) {
        this.areaShow = val
      },
    },
  },
  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  created() {
    document.addEventListener('mouseup', this.resize_mouseup)
  },
  destroyed() {
    document.removeEventListener('mouseup', this.resize_mouseup)
  },
  /* ------------------------ METHODS ------------------------ */
  methods: {
    /**
    * 显示隐藏 可拖动区域area
    */
    handle_hide_show(flag) {
      this.areaShow = flag
      if (flag) {
        const _w = this.dragNum ? this.dragNum : 300
        this.$refs.dragAreaVertical.style = 'height: ' + _w + 'px;transition: all .2s;'
      } else {
        this.$refs.dragAreaVertical.style = 'height: 0;transition: all .2s;'
      }
    },
    /**
    * 关闭显示框
    */
    handle_close() {
      // this.areaDestroyed = true
      this.$emit('close')
    },
    /**
     * 更改 可拖动区域area 高度
     */
    resize_mousedown(ev) {
      this.sidebarMousedownNum = ev.screenY
      this.sidebarOldNum = this.$refs.dragAreaVertical.offsetHeight
      document.addEventListener('mousemove', this.resize_mousemove)
    },
    /**
     * 更改 可拖动区域 高度
     * 与manoco-edit呼应
     *  manoco-edit margin-view-overlays(line number) line-height is 18px; .base_drag_vertical max-height: 630px[18px * 15];
     */
    resize_mousemove(ev) {
      if (!this.areaShow) {
        return false
      }
      const _cz = (ev.screenY - this.sidebarMousedownNum)
      let newNum = _cz > 0 ? this.sidebarOldNum - _cz : Math.abs(_cz) + this.sidebarOldNum // 可拖动区域 新的高度

      if (newNum > 630) {
        newNum = 630
      }
      if (newNum < 63) {
        newNum = 63
      }

      this.$refs.dragAreaVertical.style.height = newNum + 'px'
      this.dragNum = newNum
    },
    /**
     * 更改 可拖动区域 高度
     */
    resize_mouseup() {
      this.sidebarMousedownNum = this.sidebarOldNum = null
      document.removeEventListener('mousemove', this.resize_mousemove)
    },
  },
}
</script>

<template>
  <div v-if="!areaDestroyed" ref="dragAreaVertical" class="base_drag_vertical"
       :style="{height: show ? '300px' : '0px'}"
  >
    <div class="drag_content">
      <slot>
        base-drag-vertical
      </slot>
    </div>

    <!-- 可拖拽更改 可拖动区域 高度的div展示区高度 -->
    <div v-show="areaShow" class="area_resize" :style="{background: slidebg}" @mousedown="resize_mousedown" />
    <!--  可拖动区域 隐藏时，显示此缝隙 纯展示 -->
    <div v-show="!areaShow" class="area_slide" :style="{background: slidebg}" />

    <template v-if="showDisplayHideBtn">
      <!-- 显示 向下 折叠隐藏 按钮 -->
      <div
        v-show="areaShow"
        class="drag_area_hide"
        :style="hideButtonPosition"
        @click="handle_hide_show(false)"
      ><i class="iconfont icon-arrow-down" /></div>
      <!-- 显示 向上 折展开显示 按钮 -->
      <div
        v-show="!areaShow"
        class="drag_area_show"
        :style="hideButtonPosition"
        @click="handle_hide_show(true)"
      ><i class="iconfont icon-arrow-up" /></div>
    </template>

    <!-- 显示 关闭 标签 -->
    <div v-if="showCloseBtn" class="close_btn" @click="handle_close(true)">
      <i class="iconfont icon-reeor-fill" />
    </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/var.scss";

$cur-zindex: $zindex-num + 1;

.base_drag_vertical {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  background: $darkMain;
  z-index: $cur-zindex;
  .area_resize {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 4px;
    background-color: #3a3d51;
    cursor: row-resize;
  }
  .area_slide {
    position: absolute;
    right: 150px;
    bottom: 0;
    width: 4px;
    height: 100%;
    background-color: #3a3d51;
  }
  .drag_area_hide {
    position: absolute;
    top: 4px;
    width: 40px;
    height: 20px;
    line-height: 14px;
    text-align: center;
    border-radius: 0 0 20px 20px;
    font-size: 14px;
    color: #fff;
    background-color:rgba(220, 222, 233, 0.6);
    z-index: 50;
    opacity: .3;
    cursor: pointer;
  }
  .drag_area_show {
    position: absolute;
    bottom: 0px;
    width: 40px;
    height: 20px;
    line-height: 24px;
    text-align: center;
    border-radius: 20px 20px 0 0;
    font-size: 12px;
    color: #fff;
    background-color: rgba(220, 222, 233, 0.6);
    z-index: 50;
    opacity: .3;
    cursor: pointer;
  }
  .close_btn {
    position: absolute;
    top: 2px;
    right: 12px;

    z-index: 50;
    cursor: pointer;
    &.hover {
      transform: scale(1.3) rotate(180deg);
      transition: all .4s;
    }
    .iconfont {
      font-size: 20px;
    }
  }
  .drag_content {
    width: 100%;
    height: inherit;
    .no_data {
      margin-top: 36px;
      padding-left: 36px;
      height: 40px;
      font-size: 20px;
      color: rgba(220, 222, 233, 0.1);
    }
    ::v-deep.el-tabs {
      width: inherit;
      height: inherit;
      .el-tabs__content {
        height: calc(100% - 40px);
        // height: 100%;
        .el-tab-pane {
          height: 100%;
        }
      }
    }
  }
}
</style>
