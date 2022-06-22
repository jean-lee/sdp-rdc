/*
* author: ljx
* date: 2021-12-16
* fileName: index.vue
* description: 项目选择
*/

<script>
  import {
    mapGetters
  } from 'vuex'

  import {
    get_project_list,
  } from '@/services/project'

  export default {
    name: 'ProjectList',
    /* ------------------------ INPUT & OUTPUT ------------------------ */
    data() {
      return {
        loading: false,
        visible: false,
        searchParams: {
          pageNumber: 1,
          pageSize: 10,
          projectMode: '',
          searchVal: '',
          projectType: ''
        },
        active: null,
        list: [],
      }
    },
    /* ------------------------ COMPUTED ------------------------ */
    computed: {
      ...mapGetters([
        'projectActive',
      ]),
    },
    /* ------------------------ WATCH ------------------------ */
    watch: {
      '$route.path': {
        immediate: true,
        handler: function (val) {
          if (val.indexOf > -1) {
            this.$store.dispatch('user/update_project_active', null)
          }
        }
      },
      projectActive: {
        handler: function (val) {
          this.active = val
        }
      }

    },
    /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
    created() {
      this.getData()
    },
    /* ------------------------ METHODS ------------------------ */
    methods: {
      /**
       * 获取项目列表
       */
      async getData() {
        this.loading = true
        const rst = await get_project_list(this.searchParams)
        this.loading = false
        if (!rst.status) {
          this.$message({
            type: 'error',
            message: rst.message
          })
          return false
        }

        this.list = rst.data.list
        this.active = this.$store.dispatch('user/get_project_active', rst.data.list[0])
      },
      /**
       * 查找项目
       */
      handle_search() {
        this.getData()
      },
      /**
       * 查找项目
       */
      handle_update_project_active(proinfo) {
        this.visible = false
        this.$store.dispatch('user/update_project_active', proinfo)
      },
    }
  }
</script>

<template>
  <div class="module_project_list">
    <el-popover v-if="!!projectActive" v-model="visible" popper-class="module_check_project" placement="bottom-end"
      width="500" trigger="click">
      <el-input class="search_input" placeholder="输入任务、文件夹名称搜索" v-model="searchParams.searchVal" clearable
        @keyup.enter.native="handle_search">
        <i slot="append" class="el-icon-search" @click="handle_search" style="height: 12px;" />
      </el-input>

      <ul class="list_wrapper">
        <li v-for="(item, index) in list" :key="index"
          :class="{ active: item.projectIdentifier === projectActive.projectIdentifier }"
          @click="handle_update_project_active(item)">
          <div class="col1">{{item.projectIdentifier}}</div>
          <div class="col2">{{item.projectName}}</div>
        </li>
      </ul>
      <p slot="reference" class="title text_overflow" @click="handle_search">
        <i class="iconfont icon-product" />
        <span class="project_title"
          >{{ projectActive.projectName || projectActive.projectIdentifier || '项目名称' }}</span>
        <!-- <span>项目呀wwwwwwwww呜呜呜呜呜呜呜呜无无</span> -->
        <i class="el-icon-caret-bottom" style="vertical-align: sub;" />

      </p>
    </el-popover>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  .module_project_list {
    .title {
      max-width: 250px;
      font-size: 14px;

      .iconfont {
        margin-right: 4px;
        font-size: 28px;
        vertical-align: middle;
      }
    }
  }
</style>
