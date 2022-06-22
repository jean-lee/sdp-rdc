/*
* author: ljx
* date: 2021-10-13
* fileName: index.vue
* description: 总览
*/

<script>

export default {
  name: 'OverviewIndex',
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  data() {
    return {
      loading: false,
      list: [],
    }
  },
  /* ------------------------ COMPUTED ------------------------ */

  /* ------------------------ WATCH ------------------------ */
  watch: {},
  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.loading = false
      }, 3000)
    })
  },
  created() {},
  /* ------------------------ METHODS ------------------------ */
  methods: {
  }
}
</script>

<template>
<div class="module_overview_index">
  <div class="block">
    <el-row :gutter="12">
      <el-col :span="4" v-for="item in list" :key="item.id">
        <el-card shadow="hover">
          <el-skeleton v-if="loading" :rows="4" />
          <div class="card-wrapper" v-else>
            <div class="row tips name">
              <p class="">总览</p>
            </div>
            <div class="row maintext">
              <p class="text_overflow">总览</p>
            </div>
            <div class="row tips">
              总览
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/var.scss";

.module_overview_index {
 .block {
    margin-bottom: 8px;
    padding: 12px;
    border: 1px solid $border-gray-light;
    background: $bg-main;

    .row {
      margin-bottom: 10px;
    }

    .name {
      margin-left: -10px;
    }

    .tips {
      font-size: $fonts-14;
      color: $fontc-gray;
    }

    .maintext {
      font-size: $fonts-18;
      color: $fontc-main-title;
      font-weight: 700;
    }

    .btns {
      font-size: $fonts-14;
      color: $primaryColor;
      cursor: pointer;
    }
    ::v-deep.el-card {
      border: none;
    }
  }

  .left,
  .right {
    padding: 22px;
    height: auto;
    border: 1px solid $border-gray-light;
    background: $bg-main;
  }

  .left {

    .name {
      display: inline-block;
      width: 110px;
      color: $fontc-gray;
      height: 32px;
      line-height: 32px;
      vertical-align: top;
    }

    .value {
      display: inline-block;
      width: calc(100% - 120px);
      height: 32px;
      line-height: 32px;
    }
  }

  .right {
    height: inherit;

    .title {
      margin-bottom: 14px;;
      font-size: $fonts-14;
      color: $fontc-main-title;
    }

    .el-tag {
      margin-right: 14px;
      margin-bottom: 14px;
      border-radius: 8px;
    }
  }
}
</style>