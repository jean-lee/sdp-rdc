/*
* author: ljx
* date: 2020-12-24
* description: 可拖动改变高度的框架 横向
*/

<script>

export default {
  name: 'BaseDragLevel',
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  data() {
    return {
      sidebarShow: true, // 控制侧边栏显示隐藏
      sidebarOldW: null, // 鼠标按下时侧边栏宽度
      sidebarMousedownX: null, // 鼠标按下时坐标X轴
      dragWidth: null,
    }
  },
  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  created() {
    document.addEventListener('mouseup', this.resize_mouseup)
  },
  destroyed() {
    document.removeEventListener('mouseup', this.resize_mouseup)
  },
  /* ------------------------ COMPUTED ------------------------ */

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  methods: {
    /**
    * 显示隐藏侧边栏
    */
    handle_hide_show(flag) {
      this.sidebarShow = flag
      if (flag) {
        const _w = this.dragWidth ? this.dragWidth : 300
        this.$refs.dfsiderbar.style = 'width: ' + _w + 'px;transition: all .2s;'
      } else {
        this.$refs.dfsiderbar.style = 'width: 0;transition: all .2s;'
      }
    },
    /**
     * 更改侧边栏宽度
     */
    resize_mousedown(ev) {
      this.sidebarMousedownX = ev.screenX
      this.sidebarOldW = this.$refs.dfsiderbar.offsetWidth
      document.addEventListener('mousemove', this.resize_mousemove)
    },
    /**
     * 更改侧边栏宽度
     */
    resize_mousemove(ev) {
      if (!this.sidebarShow) {
        return false
      }
      let sidebarNewW = (ev.screenX - this.sidebarMousedownX) + this.sidebarOldW // 侧边栏新的宽度
      if (sidebarNewW > 666) {
        sidebarNewW = 666
      }
      if (sidebarNewW < 222) {
        sidebarNewW = 222
      }
      this.$refs.dfsiderbar.style.width = sidebarNewW + 'px'
      this.dragWidth = sidebarNewW
    },
    /**
     * 更改侧边栏宽度
     */
    resize_mouseup() {
      this.sidebarMousedownX = this.sidebarOldW = null
      document.removeEventListener('mousemove', this.resize_mousemove)
    },
  },
}
</script>

<template>
  <div ref="dfsiderbar" class="base_sidebar_drag">
    <div v-show="sidebarShow" class="drag_content">
      <slot>
        base-sidebar-drag
      </slot>
    </div>

    <!-- 可拖拽更改侧边栏宽度的div -->
    <div v-show="sidebarShow" class="sidebar_resize" @mousedown="resize_mousedown" />
    <!-- 侧边栏隐藏时，显示此竖条充当缝隙 纯展示 -->
    <div v-show="!sidebarShow" class="sidebar_slide" />

    <!-- 显示 向左侧折叠隐藏 按钮 -->
    <div v-show="sidebarShow" class="df_sidebar_hide" @click="handle_hide_show(false)"><i class="iconfont icon-arrow-left" /></div>
    <!-- 显示 向右侧折展开显示 按钮 -->
    <div v-show="!sidebarShow" class="df_sidebar_show" @click="handle_hide_show(true)"><i class="iconfont icon-arrow-right" /></div>

  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/var.scss";

$cur-zindex: $zindex-num + 2;

.base_sidebar_drag {
  position: relative;
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  background: $darkMain;
  .sidebar_resize {
    position: absolute;
    right: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: $darkMain;
    cursor: col-resize;
  }
  .sidebar_slide {
    position: absolute;
    right: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: $darkMain;
  }
  .df_sidebar_hide {
    position: absolute;
    top: 50%;
    right: 4px;
    margin-top: -20px;
    padding-left: 4px;
    width: 20px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px 0 0 20px;
    font-size: 14px;
    color: #fff;
    background-color:rgba(220, 222, 233, 0.6);
    z-index: $cur-zindex;
    opacity: .3;
    cursor: pointer;
  }
  .df_sidebar_show {
    position: absolute;
    top: 50%;
    right: -20px;
    margin-top: -20px;
    width: 18px;
    height: 40px;
    line-height: 40px;
    border-radius: 0 20px 20px 0;
    font-size: 12px;
    color: #fff;
    background-color: rgba(220, 222, 233, 0.6);
    z-index: $cur-zindex;
    opacity: .3;
    cursor: pointer;
  }
  .drag_content {
    width: inherit;
    height: inherit;
    overflow-y: auto;
  }
}
</style>
