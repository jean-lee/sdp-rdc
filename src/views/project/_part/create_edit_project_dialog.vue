/*
* author: ljx
* date: 2021-11-16
* fileName: create_edit_project_dialog.vue
* description: 
*/


<script>
import { PROJECT_TYPES, PROJECT_MODE } from '@/constant'

import { add_project } from '@/services/project'

export default {
  name: 'CreateEditProjectDialog',
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  props: {
    show: { type: Boolean, default: false },
    ids: { type: Number, default: -1 },
  },
  data() {
    return {
      projectTypeOptions: PROJECT_TYPES,
      projectModeOptions: PROJECT_MODE,
      id: -1,
      formData: {
        projectIdentifier: '', // 项目标识符，唯一性，数字、字母及下划线，64字符以内
        projectMode: 2, // 项目模式，1-简单模式，2-标准隔离模式
        projectName: '', // 项目名称，非必填，默认标志符，64字符以内
        projectType: '', // 项目类型，备份字段
        projectAdmin: '', // 项目管理员
        projectStatus: '', // 项目状态，备份字段
        description: '', // 
      },
      formRules: {
        projectIdentifier: [{ required: true, min: 1, max: 64 }],
        projectType: [{ required: true }],
      }
    }
  },
  /* ------------------------ COMPUTED ------------------------ */

  /* ------------------------ WATCH ------------------------ */
  watch: {
    ids: {
      immediate: true,
      handler: function(val) {
        this.id = val[0]
      }
    }
  },
  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  computed: {
    title() {
      return this.id > -1 ? '新建项目' : '编辑项目'
    }
  },
  created() {
  },
  /* ------------------------ METHODS ------------------------ */
  methods: {
    /**
     * 关闭弹窗
     */
    close(id = -1) {
      this.$emit('close', false, id)
    },
    /**
     * 关闭弹窗
     */
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) { // 验证通过
          this.commit_data()
        } else {
          this.$message({ type: 'error', message: '请补充必填项数据' })
          return false
        }
      })
    },
    /**
     * 验证成功，提交数据 至接口
     */
    async commit_data() {
      const rst = await add_project(this.formData)
      if (!rst.status) {
        this.$message({ type: 'error', message: rst.message })
        return false
      }
      this.close(1)
    }
  }
}
</script>

<template>
  <base-dialog :show="show" :title="title" class="module_create_edit_project_dialog"
    @close="close" @cancel="close" @submit="submit">
    <el-form ref="form" :model="formData" :rules="formRules" label-position="left" label-width="110px">
      <el-form-item label="空间标识符" prop="projectIdentifier">
        <el-input v-model="formData.projectIdentifier" :minlength="1" :maxlength="64"
          placeholder="可包含字母(小写)、数字、下划线_，以字母开头，长度1~64"></el-input>
      </el-form-item>
      <el-form-item label="空间名称" prop="projectName">
        <el-input v-model="formData.projectName" :minlength="1" :maxlength="128"
          placeholder="可包含字母（大小写）、汉字、数字下划线_和横线-，长度1-128"></el-input>
      </el-form-item>
      <el-form-item label="空间模式" prop="projectMode">
        <el-radio-group v-model="formData.projectMode">
          <el-radio v-for="item in projectModeOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="空间类型" prop="projectType">
        <el-select v-model="formData.projectType">
          <el-option v-for="(item, index) in projectTypeOptions" :key="index"
            :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="空间描述" prop="description">
        <el-input type="textarea" v-model="formData.description" placeholder="简要描述一下这个工作空间的作用（除特殊字符外的任意字符，长度0~200）">
        </el-input>
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/var.scss";

.module_create_edit_project_dialog {

}
</style>