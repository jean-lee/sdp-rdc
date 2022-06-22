/*
* author: ljx
* date: 2021-11-03
* fileName: index.vue
* description: 项目模块 - 根模块
*/

<script>
import { PAGE_SIZES, PROJECT_TYPES, PROJECT_MODE, USERS_PRODUCT_NAVIGATION } from '@/constant'

import {
  get_project_list,
  get_brows_history_list,
} from '@/services/project'

import CreateEditProjectDialog from './_part/create_edit_project_dialog.vue'

export default {
  name: 'Project',
  components: {
    CreateEditProjectDialog,
  },
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  data() {
    return {
      loading: false,
      projectTypeOptions: PROJECT_TYPES, // 项目类型
      projectModeOptions: PROJECT_MODE, // 模式
      searchParams: {
        pageNumber: 1,
        pageSize: 10,
        projectMode: '',
        searchVal: '',
        projectType: ''
      },
      pageSize: PAGE_SIZES,
      total: 0,
      openRecent: [],
      projectList: [],

      // 弹窗
      showCreateEditProjectDialog: false,
      targetIds: [],
    }
  },
  /* ------------------------ COMPUTED ------------------------ */

  /* ------------------------ WATCH ------------------------ */
  watch: {
    searchParams: {
      // immediate: true,
      handler: function(val) {
        this.lodash_debounce(this.get_data())
      }
    }
  },
  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  mounted() {
  },
  beforeCreate() {
    this.$store.dispatch('user/update_project_active', null)
  },
  async created() {
    this.get_history_data() // 最近打开的项目
    this.get_data() // 项目列表
  },
  /* ------------------------ METHODS ------------------------ */
  methods: {
    /**
     * 按 关键字 搜索
     */
    handle_search() {
      this.searchParams.pageNumber = 1
      this.get_data()
    },
    /**
     * 重置 搜索条件
     */
    handle_reset_search() {
      this.searchParams.searchVal = ''
      this.searchParams.projectMode = ''
      this.searchParams.projectType = ''
    },
    /**
     * 刷新 按照当前的查关键字、页码值重查
     */
    handle_refresh() {
      this.get_data()
    },
    /**
     * 切换页码
     */
    handle_current_change(index) {
      this.searchParams.pageNumber = index
      this.get_data()
    },
    /**
     * 切换 分页条数
     */
    handle_size_change(val) {
      this.searchParams.pageSize = val
      this.searchParams.pageNumber = 1
      this.get_data()
    },
    /**
     * 获取数据
     */
    async get_data() {
      this.loading = true
      const rst = await get_project_list(this.searchParams)
      setTimeout(() => {
        this.loading = false
      }, 300)

      if (!rst.status) {
        this.$message({ type: 'error', message: rst.message || '' })
        return false
      }

      this.projectList = rst.data.list

      this.total = rst.data.total
      this.searchParams.pageNumber = rst.data.pageNumber
      this.searchParams.pageSize = rst.data.pageSize
    },
    /**
     * 获取数据
     */
    async get_history_data() {
      const rst = await get_brows_history_list()
      if (!rst.status) return false
      this.openRecent = rst.data || []
    },
    /**
     * 进入工作区
     */
    goto_workspace(proinfo) {
      this.$router.push({ name: 'operationCenter', params: { projectid: proinfo.projectId }})
      this.$store.dispatch('user/update_project_active', proinfo)
      this.$store.dispatch('user/update_top_navagation_active', USERS_PRODUCT_NAVIGATION.operationCenter)
    },
    /**
     * 新建项目空间
     */
    open_close_create_edit_project_dialog(arr) {
      const flag = arr[0]
      const id = arr[1] || -1
      if (!flag) { // 关
        this.showCreateEditProjectDialog = false
        this.targetIds = []
        id === -1 ? null : this.handle_refresh() // id存在，则刷新用户列表
      } else {
        if (id === -1) {
          this.targetIds = this.$refs.listRef ? this.$refs.listRef.multipleSelected : []
        } else { // 点击表格内行尾按钮唤起菜单
          this.targetIds = [id]
        }
        this.showCreateEditProjectDialog = true
      }
    }
  },
  filters: {
    get_type_label: function(value) {
      const v = Number(value)
      return PROJECT_TYPES[v].label
    }
  }
}
</script>

<template>
  <div class="module_project">
    <div class="block">
      <div class="top">
        <p>项目空间<span>近期删除</span></p>
      </div>
      <div class="tips">
        <p>采用项目空间管理数据治理项目，如需新建项目空间，请点击 新建项目空间 按钮创建，<span style="cursor: help;">了解更多</span></p>
      </div>
      <div class="create">
        <el-button icon="el-icon-plus" @click="open_close_create_edit_project_dialog([true])">新建项目空间</el-button>
      </div>
    </div>

    <div class="block" v-if="openRecent.length > 0">
      <div class="top">
        <p>近期打开</p>
      </div>
        <div>
          <el-button class="quick_visit" v-for="item in openRecent" :key="item.value"
            @click="goto_workspace(item)">
            <p class="first">{{item.projectName}}</p>
            <p class="second">{{ item.projectIdentifier || item.visitTime }}</p>
          </el-button>
        </div>
    </div>

    <div class="block">
      <div class="top">
        <p>我的项目空间</p>
      </div>
      <!-- 列表筛选 条件 -->
      <div class="custom_filter_wrapper w-full clear-right op_row">
        <div class="search_item">
          <label>模式：</label>
          <el-select v-model="searchParams.projectMode" clearable>
            <el-option v-for="(item, index) in projectModeOptions" :key="index" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="search_item">
          <label>类型：</label>
          <el-select v-model="searchParams.projectType" clearable>
            <el-option v-for="(item, index) in projectTypeOptions" :key="index" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="search_item">
          <el-input class="searchString_input" placeholder="输入用户名称、显示名称搜索" v-model="searchParams.searchVal" clearable
            @keyup.enter.native="handle_search">
            <i slot="append" class="el-icon-search" @click="handle_search" style="height: 12px;" />
          </el-input>
        </div>
        <div class="search_item">
          <!-- <el-button type="text" icon="el-icon-refresh" @click="handle_refresh" title="刷新" /> -->
          <el-button type="text" @click="handle_reset_search">重置</el-button>
          <el-button type="text" @click="handle_search">查询</el-button>
        </div>

      </div>

      <!-- 项目列表 v-loading="loading" element-loading-text="正在加载中" -->
      <div class="project_list_wrapper">
        <template v-if="!projectList.length">
          <img class="pic-common_nodata" src="@/assets/common_no_data.png" alt="no-data">
        </template>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          <el-card ref="listRef" shadow="hover" v-for="item in projectList" :key="item.value">
            <div class="title w-full">{{item.projectName || item.projectIdentifier }}</div>
            <div class="content">
              <div class="flex">
                <div class="tip_bg">{{item.projectIdentifier}}</div>
              </div>
              <div class="flex" style="margin: 4px 0; ">
                <div class="tip_bg">{{item.projectMode === 1 ? '简单模式' : '标准隔离模式' }}</div>
                <!-- <div class="tip_bg">{{ item.typelabel }}</div> -->
                <div class="tip_bg">{{ item.projectType | get_type_label }}</div>
              </div>
              <div class="text_overflow ">{{item.description}}</div>
              <div class="flex">
                <div class="w-2/6">{{item.createdBy || '-' }}</div>
                <div class="w-4/6">{{item.createdTime || '-' }}</div>
              </div>
            </div>
            <div class="flex op_row">
              <!-- @click="goto_workspace(item)" -->
              <div class="w-1/2">项目看板</div>|
              <div class="w-1/2">进入工作区 》</div>
            </div>
          </el-card>
        </div>
      </div>

    <!-- 分页 -->
    <my-pagination v-if="total > 0" :line="searchParams.pageSize" :cur="searchParams.pageNum" :page-sizes="pageSize" :total="total"
      :show-jump="true" :show-total="true" :show-size="true" @page-change="handle_current_change"
      @size-change="handle_size_change" />
  </div>

    <!-- 新建项目 -->
    <CreateEditProjectDialog v-if="showCreateEditProjectDialog" :show="showCreateEditProjectDialog" :id="targetIds"
      @close="open_close_create_edit_project_dialog" />
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/var.scss";

.module_project {
  position: relative;
  .block{
    margin: 20px;
    .top {
      height: 32px;
      line-height: 32px;
      font-size: $fonts-14;
      font-weight: 700;
      span {
        padding-left: 10px;
        color: $fontc-gray;
        font-size: $fonts-12;
        font-weight: 400;
      }
    }
    .quick_visit {
      .first {
        margin-top: 4px;
        text-align: left;
      }
      .second {
        margin-top: 4px;
        font-size: 12px;
        text-align: right;
      }
    }
    .tips {
      height: 32px;
      line-height: 32px;
      font-size: 12px;
      span {
        color: $primaryColor;
      }
    }

    .project_list_wrapper {
      .pic-common_nodata {
        margin: 30px auto;
        width: 260px;
      }
    }
    ::v-deep.el-card__body {
      padding: 0;
      // height: 200px;
      box-sizing: content-box;
      .title {
        padding: 4px 12px;
        height: 36px;
        line-height: 36px;
        font-size: $fonts-14;
        font-weight: 700;
      }
      .content {
        padding: 0 12px;
        font-size: $fonts-12;
        height: 130px;
        line-height: 36px;
        color: $fontc-gray;
        .tip_bg {
          margin-right: 12px;
          padding: 0px 8px;
          width: fit-content;
          height: 22px;
          line-height: 22px;
          // font-size: 12px;
          border-radius: 4px;
          background: $bg-gray-l;
          color: $fontc-dark;
        }
      }
      .op_row {
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        background: $bg-gray-l;
        color: #999;
        text-align: center;
        div {
          color: $fontc-dark;
          &:hover {
            color: $primaryColor;
            cursor: pointer;
          }
        }
      }
    }
  }
  .custom_filter_wrapper {
    margin-bottom: 16px;
    .search_item {
      display: inline-block;
      margin-right: 26px;
      label {
        font-size: $fonts-12;
        font-weight: 400;;
      }
      .el-input {
        width: 260px;
      }
      .el-select {
        width: 130px;
      }
    }
  }
}
</style>