/*
* author: ljx
* date: cron表达式生成组件
* description: Cron表达式为任务的周期性启动方式，请务必准确配置。
* 点击生成Cron表达式按钮可查看目前所有项目的调度时间
*/

<script>
import Vcrontab from 'vcrontab'

export default {
  name: 'CronDialog',
  components: {
    Vcrontab,
  },
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  props: {
    show: { type: Boolean, default: false },
    val: { type: String, default: '' }, // 父组件传入的表达式的值， 在cron中反向解析
  },
  data() {
    return {
      cron_expression: this.val,
    }
  },
  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPUTED ------------------------ */

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  methods: {
    /**
     * val: 确定后回传的值
     */
    crontab_fill(val) {
      this.cron_expression = val
      this.close()
    },
    /**
     * 关闭
     */
    close() {
      this.$emit('close', this.cron_expression)
    },
  },
}
</script>

<template>
  <!--  size="big_normal" -->
  <base-dialog
    class="module_cron_dialog"
    :show="show"
    :max-height="600"
    :is-append-to-body="true"
    :has-footer="false"
    @close="close"
  >
    <Vcrontab
      key="jobFlowCronExp"
      :expression="cron_expression"
      @hide="close"
      @fill="crontab_fill"
    />
  </base-dialog>
</template>
