/* COMPONENT DOCUMENT
* author: ljx
* date: 2021-11-11
* description: monaco 代码在线编辑器 引用
*/

<script>
// 引入 所有的内置语言和控件
import * as monaco from 'monaco-editor'

export default {
  name: 'MonacoEditor',
  /* ############################## INPUT & OUTPUT ############################## */
  props: {
    options: { type: Object, default: () => { return { language: 'sql', readOnly: false } } },
    codeVal: { type: String, default: '' }, // 纯代码
  },
  data() {
    return {
      monacoInstance: null,
      provider: null,
    }
  },
  /* ############################## COMPUTED ############################## */

  /* ############################## WATCH ############################## */
  watch: {
    codeVal: {
      // immediate: true,
      // deep: true,
      handler: function(val) {
        if (!val) return
        this.dispose()
        this.init()
      },
    },
  },
  /* ############################## LIFECYCLE HOOKS (created & mounted & ...) ############################## */
  mounted() {
    this.$nextTick(() => {
      // if (!this.codeVal) return
      this.init()
    })
  },
  /* ############################## METHODS ############################## */
  methods: {
    /**
     * 销毁
     */
    dispose() {
      if (this.monacoInstance) {
        if (this.monacoInstance.getModel()) {
          this.monacoInstance.getModel().dispose()
        }
        this.monacoInstance.dispose()
        this.monacoInstance = null
        if (this.provider) {
          this.provider.dispose()
          this.provider = null
        }
      }
    },
    /**
     * 初始化 编辑器
     * 创建编辑器实例 monacoInstance
     */
    init() {
      if (!this.$refs.container) return

      const _options = {
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        theme: 'vs-light',
        autoIndex: true,
        contextmenu: true, // 不显示右键
        automaticLayout: true, // 自动布局
        mouseWheelZoom: true,
        scrollBeyondLastColumn: 20, // 滚动超越最后一行20行高
        parameterHints: {
          enabled: true,
          cycle: true,
        },
        padding: {
          top: 0,
          bottom: 66,
        },
      }
      const lastOptions = Object.assign(_options, {
        ...this.options,
        value: this.codeVal,
      })

      this.monacoInstance = monaco.editor.create(this.$refs.container, lastOptions)
      this.bindEvent()
    },
    bindEvent() {
      this.monacoInstance.onDidChangeModelContent(() => {
        // console.log('onDidChangeModelContent ----------- ')
      })
    },
    /**
     * 更新代码
     */
    codeval_update() {
      if (!this.monacoInstance) return
      this.monacoInstance.updateOptions({
        value: this.codeVal,
      })
    },
    /**
     * 获取编辑器内代码
     */
    get_codeval_last() {
      return this.monacoInstance.getValue()
    },
  },
}

</script>

<template>
  <div ref="container" class="module_monaco_editor" />
</template>
<style scoped>
.module_monaco_editor {
  height: 100%;
}
</style>

