<script>
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020-08-26
 * desc: 基础弹窗
 */

export default {
  name: 'BaseDialog',
  /* ############################## INPUT & OUTPUT ############################## */
  props: {
    // loading (该状态中不能关闭弹窗)
    loading: { type: Boolean, default: false },

    // 现实关闭项的控制
    show: { type: Boolean, default: false },
    // 弹窗是否要append 到 body元素上
    isAppendToBody: { type: Boolean, default: false },
    // 是否全屏
    isFullscreen: { type: Boolean, default: false },
    // 弹窗的 model
    hasModal: { type: Boolean, default: true },
    // 是否可以通过点击 model 关闭弹窗
    closeOnClickModal: { type: Boolean, default: false },
    // 是否可以通过按下 ESC 关闭dialog
    closeOnPressEscape: { type: Boolean, default: true },

    // 弹窗的 top
    top: { type: String, default: '5%' },
    // 弹窗的 right
    right: { type: String, default: 'auto' },
    // 是否固定右侧
    position: { type: String, default: 'center' },
    // 固定在右侧后，页头页脚是否固定
    rightFixed: { type: String, default: '' }, // fixed-header-footer
    // 弹窗尺寸 small: 300 / middle: 600 / normal: 800 / big_normal: 1000 / big: 1200
    size: { type: String, default: 'middle' },
    // 有内容撑开弹窗 宽度
    autowidth: { type: Boolean, default: false },
    // 弹窗的 body 的最小高度
    minHeight: { type: Number, default: 100 },
    // 弹窗的主题色: white | black | theme_black_light
    theme: { type: String, default: 'white' },

    // 是否有默认的 header
    hasHeader: { type: Boolean, default: true },
    // hasHeader 为 true 状态下，显示的 titile
    title: { type: String, default: '提示' },
    // header 下方是否有分割线（默认是占满全 dialog 的 border-bottom）
    hasCutOffLine: { type: Boolean, default: false },
    // header 是否显示 X 按钮
    hasCloseXButton: { type: Boolean, default: true },

    // 是否有默认的footer
    hasFooter: { type: Boolean, default: true },
    // footer 的尺寸 small: 40 / middle; 60 / big: 90
    footerSize: { type: String, default: 'middle' },
    // 展示 取消 按钮
    hasButtonCancel: { type: Boolean, default: true },
    // 取消按钮的文字
    cancelButtonText: { type: String, default: '取 消' },
    // 确定按钮的文字
    okButtonText: { type: String, default: '确 定' }

    // 确定Dialog 的自定义类名
    // customClass: { type: String, default: '' }
    // 是否对头部和底部采用居中布局
    // center: { type: Boolean, default: true }
  },
  data() {
    return {

    }
  },
  /* ############################## LIFECYCLE HOOKS (created & mounted & ...) ############################## */
  /* ############################## COMPUTED ############################## */
  computed: {
    dialog_classname() {
      // right-placement: elementui-custom right-placement-fixed-header-footer
      return this.autoWidth
        ? `${this.loading ? 'dialog_loading' : ''}`
        : `module_base_dialog module_base_dialog_${this.size} ${
          this.position === 'right' ? 'right-placement' : ''} ${
          this.rightFixed === 'fixed-header-footer' ? 'fixed_header_footer' : ''} ${
          this.hasCloseXButton ? '' : 'hide_close_button'} ${
          this.loading ? 'dialog_loading' : ''}`
    }
  },
  /* ############################## WATCH ############################## */
  /* ############################## METHODS ############################## */
  methods: {
    /**
     * 打开 弹窗
     */
    open() {
      this.$emit('open')
    },
    /**
     * 点击 header "X"按钮
     */
    close() {
      this.$emit('close')
    },
    /**
     * 点击 footer "取消"按钮
     */
    cancel() {
      this.$emit('cancel')
    },
    /**
     * 点击 footer "确定"按钮
     */
    submit() {
      if (this.loading) { return }
      this.$emit('submit')
    }
  }
}
</script>

<template>
  <el-dialog
    ref="dialog"
    :visible.sync="show"
    :fullscreen="isFullscreen"
    :class="theme"
    :custom-class="dialog_classname"
    :close-on-press-escape="closeOnPressEscape"
    :lock-scroll="true"
    :top="top"
    :append-to-body="isAppendToBody"
    :modal="hasModal"
    :close-on-click-modal="closeOnClickModal"
    :before-close="close"
    @open="open"
  >

    <template v-if="hasHeader">
      <div slot="title" :class="['dialog_header', {['cut_off_line_' + size]: hasCutOffLine}, {dialog_loading: loading}]">
        <slot name="header">
          <div slot="title" class="header_title">{{ title }}</div>
        </slot>
      </div>
    </template>

    <div v-loading="loading" class="dialog_body" :style="{minHeight: minHeight + 'px'}">
      <slot>正在加载内容...</slot>
    </div>

    <template v-if="hasFooter">
      <div slot="footer">
        <slot name="footer">
          <div slot="footer" :class="['dialog_footer', 'dialog_footer_' + footerSize, {['cut_off_line_' + size]: hasCutOffLine}]">
            <el-button
              class="footer_button btn_sure"
              size="small"
              type="primary"
              :disabled="loading"
              @click.stop="submit"
            >{{ okButtonText }}</el-button>
            <el-button
              v-if="hasButtonCancel"
              class="footer_button btn_cancel"
              size="small"
              :disabled="loading"
              @click.stop="cancel"
            >{{ cancelButtonText }}</el-button>
          </div>
        </slot>
      </div>
    </template>

  </el-dialog>
</template>

<style rel="stylesheet/scss" lang="scss">
@import "~@/styles/var.scss";

/**
 * 一些外部可使用的 class
 * dialog_header
 * header_title
 * dialog_footer
 *   dialog_footer_small dialog_footer_middle dialog_footer_big
 * cut_off_line_small cut_off_line_middle cut_off_line_big
 * footer_button
 * grey_button
 */

$_header_height           : 50px;

$_footer_small_height     : 30px;
$_footer_middle_height    : 60px;
$_footer_big_height       : 90px;

$_dialog_small_width      : 300px;
$_dialog_middle_width     : 600px;
$_dialog_normal_width     : 800px;
$_dialog_big_normal_width : 1000px;
$_dialog_big_width        : 1200px;

$_padding_left_and_right  : 20px;

// 分隔线 style
@mixin _header_cut_off_line_style($size) {
  position: relative;
  border-bottom: none;
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    // left: $_padding_left_and_right;
    left:0;
    bottom: 0;
    height: 1px;
    // width: $size - ($_padding_left_and_right * 2);
    width: $size;
    background-color: $border-gray-light;
  }
}

@mixin _footer_cut_off_line_style($size) {
  position: relative;
  border-top: none;
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    // left: $_padding_left_and_right;
    left:0;
    top: 0;
    height: 1px;
    // width: $size - ($_padding_left_and_right * 2);
    width: $size;
    background-color: $border-gray-light;
  }
}

// dialog header style
@mixin _header_style() {
  padding: 0;
  height: $_header_height;
  line-height: $_header_height;
  border-bottom: 1px solid $border-gray-light;
  padding-left: $_padding_left_and_right;
  letter-spacing: 1px;
  &.cut_off_line_small {
    @include _header_cut_off_line_style($_dialog_small_width);
  }
  &.cut_off_line_middle {
    @include _header_cut_off_line_style($_dialog_middle_width);
  }
  &.cut_off_line_normal {
    @include _header_cut_off_line_style($_dialog_normal_width);
  }
  &.cut_off_line_big_normal {
    @include _header_cut_off_line_style($_dialog_big_normal_width);
  }
  &.cut_off_line_big {
    @include _header_cut_off_line_style($_dialog_big_width);
  }
}

// dialog footer style
@mixin _footer_style($height, $btn_h, $btn_w) {
  height: $height;
  line-height: $height;
  // border-top 1px; solid $border-gray-light;
  text-align: right;
  // padding-right: 40px;
  .footer_button {
    height: $btn_h;
    width: $btn_w;
    line-height: 0;
    .footer_button + .footer_button {
      margin-left: 30px;
    }
  }
  &.cut_off_line_small {
    @include _footer_cut_off_line_style($_dialog_small_width);
  }
  &.cut_off_line_middle {
    @include _footer_cut_off_line_style($_dialog_middle_width);
  }
  &.cut_off_line_normal {
    @include _footer_cut_off_line_style($_dialog_normal_width);
  }
  &.cut_off_line_big_normal {
    @include _footer_cut_off_line_style($_dialog_big_normal_width);
  }
  &.cut_off_line_big {
    @include _footer_cut_off_line_style($_dialog_big_width);
  }
}
.module_base_dialog {
  background-color: $bg-main;
}

.module_base_dialog {
  // header footer
  .el-dialog__header {
    padding: 0;
    text-align: left;
  }
  // header
  &.hide_close_button {
    .el-dialog__headerbtn {
      display: none;
    }
  }
  &.dialog_loading {
    .el-dialog__headerbtn {
      .el-icon-close:before {
        color: $border-gray-light;
        cursor: not-allowed;
      }
    }
  }
  .el-dialog__header {
    .dialog_header {
      @include _header_style();
    }
  }
  .header_title {
    font-size: $fonts-16;
    color: $fontc-main-title;
  }
  .dialog_header~.el-dialog__headerbtn {
    top: 15px;
    right: $_padding_left_and_right;
    height: 27px;
  }
  .el-dialog__close {
    font-size: 26px;
    line-height: 25px;
    color: $fontc-gray;
    &:hover {
      color: $primaryColor!important;
      transform: scale(1.2) rotate(60deg);
      transition: all 1s;
    }
  }
  // footer
  .dialog_footer_small {
    @include _footer_style($_footer_small_height, 30px, 60px);
  }
  .dialog_footer_middle {
    @include _footer_style($_footer_middle_height, 32px, 90px);
  }
  .dialog_footer_big {
    @include _footer_style($_footer_big_height, 50px, 106px);
  }
  // body
  // .el-dialog__body {
  //   color: $fontc-main-title;
  // }
}

// width dialog
.module_base_dialog_small {
  width: $_dialog_small_width;
}
.module_base_dialog_middle {
  width: $_dialog_middle_width;
}
.module_base_dialog_normal {
  width: $_dialog_normal_width;
}
.module_base_dialog_big_normal {
  width: $_dialog_big_normal_width;
}
.module_base_dialog_big {
  width: $_dialog_big_width;
}

// 主题
.black {
  ::v-deep.el-dialog {
    .el-dialog__header,
    .el-dialog__footer {
      background: #3c3f41;
    }
    .el-dialog__close {
      color: $fontc-gray;
      // &:hover {
      //   color: $primaryColor!important;
      //   // transform: scale(1.1) rotate(30deg);
      // }
    }
  }
  ::v-deep.el-form-item__label {
    color: $fontc-brown;
  }
}

/**
 * dialog 使用白色主题
 */
.theme_black_light {
  ::v-deep.el-dialog {
    background-color:#3C3F41;
    .el-dialog__header {
      .dialog_header{
        border-bottom: 1px solid #44484b;
        .header_title {
          color:$fontc-main-title;
        }
      }
    }
    .el-dialog__header,
    .el-dialog__footer {
      background: #3C3F41;
    }
    .el-dialog__close {
      color: $fontc-main-title;
    }
  }
}

/**
 * 弹窗固定在页面右侧, size使用small
 * 
 */
.right-placement {
  margin-right: 0;
  height: auto;
  overflow: auto;
  box-sizing: border-box;
  .el-dialog__body {
    height: auto; // 100% - 页头 - 页脚 - 页脚填充的30px
    overflow: auto;
  }
}
/**
 * 弹窗固定在右侧后，固定页头页脚，仅滚动el-dialog__body
 */
.fixed_header_footer {
  height: 100%;
  overflow: hidden;
  .el-dialog__body {
    height: calc(100% - #{$_header_height} - #{$_footer_small_height} - 30px); // 100% - 页头 - 页脚 - 页脚填充的30px
    overflow: auto;
  }
}
</style>
