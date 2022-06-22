/*
* author: ljx
* date: 2021-11-08
* description: 基础 分页组件
*/

<script>

export default {
  name: 'Pagination',
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  props: {
    cur: { type: Number, default: 0 },
    line: { type: Number, default: 12 },
    total: { type: Number, default: 0 },
    showTotal: { type: Boolean, default: false },
    showJump: { type: Boolean, default: true },
    showSize: { type: Boolean, default: true },
    pageSizes: { type: Array, default: () => { return [1, 2, 3, 4] } }
  },
  data() {
    return {
      layout: 'prev, pager, next' // 页码的默认显示格式 layout="total, sizes, prev, pager, next, jumper"
    }
  },
  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  created() {
    if (this.showTotal) {
      this.layout += ', total'
    }
    if (this.showJump) {
      this.layout += ', jumper'
    }
    if (this.showSize) {
      this.layout += ', sizes'
    }
  },

  /* ------------------------ COMPUTED ------------------------ */

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  methods: {
    /**
     * 切换页码
     */
    page_change(index) {
      this.$emit('page-change', index)
    },
    /**
     * 改变分页条数
     */
    handleSizeChange(val) {
      this.$emit('size-change', val)
    }
  }
}
</script>

<template>
  <el-pagination
    small
    class="module_pagination"
    :layout="layout"
    :page-sizes="pageSizes"
    :page-size="line"
    :current-page="cur"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="page_change"
  />

</template>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/var.scss";

.module_pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  text-align: right;
  padding: 0;
  ::v-deep.el-pagination__sizes {
    order: -1;
  }
}

</style>
