/*
* author: ljx
* date: 2021-05-27
* fileName: PieChart.vue
* description: 饼图 组件
*/

<script>
import * as echarts from 'echarts';
import resize from './mixins/resize'
import { uuid } from '@/utils/index.js'

// 图例 设置
const legendVal = {
  orient: 'vertical',
  left: '50%',
  top: '8%',
  textStyle: {
    color: '#f8f8f8',
    rich: {
      name: {
        align: 'left',
        width: 110,
        fontSize: 12,
      },
      rate: {
        align: 'left',
        width: 80,
        fontSize: 12,
      },
      value: {
        align: 'right',
        width: 80,
        fontSize: 12,
      },
    },
  },
}
const seriesVal = { name: 'name', radius: ['40%', '55%'], center: ['25%', '50%'] }
const chartColors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
const mainTitleVal = {
  text: '',
  left: '52%',
  top: '20%',
  textStyle: {},
}
const normalFontStyle = {
  fontSize: 12,
  color: 'rgba(23, 132, 245, 0.8)',
  fontStyle: 'normal',
}

export default {
  name: 'PieChart',
  mixins: [resize],
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  props: {
    chartOptions: { type: Object, default: () => {
        return {
          className: 'piechart_paint',
          pwidth: '',
          pheight: '',
          chartData: [],
        }
      }
    },
    // className: { type: String, default: 'pie_chart' },
    // // 容纳canvas的父级的尺寸
    // pwidth: { type: String, default: '100%' },
    // pheight: { type: String, default: '100%' },
    autoResize: { type: Boolean, default: true },
    // // 主标题
    // text: { type: Object, default: () => { return mainTitleVal } },
    // // 副标题
    // subtext: { type: String, default: '副标题' },
    // // 图数据
    // chartdata: { type: [Object, Array], required: true, default: () => { return [] } },
    // // 图表背景色
    // chartbg: { type: String, default: 'transparent' },
    // 图表绘制 图例及文字配置
    chartlegend: { type: Object, default() { return legendVal } },
    // // 图在父区域内绘制的位置
    // chartgrid: { type: Object, default() {
    //   return { containLabel: true, left: '0', top: '0', width: 'auto',
    //     height: 'auto' }
    // } },
    chartseries: { type: Object, default() { return seriesVal } },
    colors: { type: Array, default: () => { return chartColors } },
  },
  data() {
    return {
      chartHook: uuid('piechart_id_', 10),
      chart: null, // 图 实例
    }
  },
  /* ------------------------ WATCH ------------------------ */
  watch: {
    'chartOptions.chartData': {
      deep: true,
      handler: function () {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 300)
        this.setChartOption()
      },
    },
  },
  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  // beforeDestroy() {
  //   if (!this.chart) {
  //     return
  //   }
  //   this.chart.dispose()
  //   this.chart = null
  // },
  /* ------------------------ COMPUTED ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  methods: {
    /**
   * 初始化
   */
    initChart() {
      this.chart = echarts.init(document.getElementById(this.chartHook))
      this.chart && this.setChartOption()
    },
    /**
   * 图标配置项
   */
    setChartOption() {
      const { mainTitle, subtext, chartbg, chartgrid, xname, yname, chartData } = this.chartOptions
      const _data = chartData[0].data

      // console.log('pie _data: ', chartData, _data )

      const options = {
        title: {
          text: mainTitle ? (mainTitle.text ? mainTitle.text : '' ) : '',
          left: mainTitle ? (mainTitle.left ? mainTitle.left : 10) : 10,
          top: mainTitle ? (mainTitle.top ? mainTitle.top : 10) : 10,
          // padding: [0],
          // itemGap: 10, // 主副标题纵向间距
          textStyle: mainTitle ? (mainTitle.textStyle ? mainTitle.textStyle : normalFontStyle)
          : normalFontStyle, // 主标题 样式
          // subtext: this.subtext,
          // subtextStyle: { // 主标题 样式，
          //   align: 'center', // 副标题使用\n设置为多行时的对齐方式
          //   fontSize: 12,
          //   color: '#ccc',
          // },
        },
        backgroundColor: chartbg || '#fff',
        tooltip: { // 鼠标hover后的显示
          trigger: 'item',
          formatter: '{b} : {c}  ({d}%)',
        },
        legend: { // 图标颜色代指提示
          type: 'scroll', // 默认 plain
          icon: 'circle',
          align: 'left',
          orient: this.chartlegend.orient,
          top: this.chartlegend.top,
          left: this.chartlegend.left,
          right: 20,
          bottom: 20,
          pageTextStyle: {
            fontSize: 12,
            color: '#feee',
            fontStyle: 'normal',
          },

          itemGap: 10, // 各个item之间的间隔，横向为水平间隔
          itemWidth: 14,
          itemHeight: 14,
          symbolKeepAspect: false,
          textStyle: this.chartlegend.textStyle,
          data: _data.map((item) => item.name),
          formatter: function(name) {
            if (_data && _data.length) {
              for (let i = 0; i <= _data.length; i++) {
                if (name === _data[i].name) {
                  return (
                    '{name|' +
                  name +
                  '}' +
                  '{value|' +
                    _data[i].value +
                  '} '
                  )
                }
              }
            }
          },
        },
        calculable: true,
        grid: this.chartgrid,
        series: chartData,
        // series: [
        //   {
        //     name: '数量',
        //     type: 'pie',
        //     // roseType: 'radius',
        //     hoverAnimation: false,
        //     avoidLabelOverlap: true,
        //     clockwise: true,
        //     hoverOffset: 30,
        //     radius: this.chartseries.radius,
        //     center: this.chartseries.center,
        //     label: {
        //       normal: {
        //         show: false,
        //         position: 'center',
        //         formatter: '{text|{b}}\n{c} ({d}%)',
        //         rich: {
        //           text: {
        //             color: '#666',
        //             fontSize: 14,
        //             align: 'center',
        //             verticalAlign: 'middle',
        //             padding: 8,
        //           },
        //           value: {
        //             color: '#8693F3',
        //             fontSize: 14,
        //             align: 'center',
        //             verticalAlign: 'middle',
        //           },
        //         },
        //       },
        //       emphasis: {
        //         show: true,
        //         textStyle: {
        //           fontSize: 14,
        //         },
        //       },
        //     },
        //     click: false,
        //     data: chartData,
        //     animationEasing: 'cubicInOut',
        //     animationDuration: 2600,
        //   },
        // ],
        color: this.colors,
      }
      // console.log('pie chartOptions: ', options )

      this.chart.setOption(options)
    },
  },
}
</script>

<template>
<div :id="chartHook" :class="chartOptions.className"
  :style="{width: chartOptions.pwidth, height: chartOptions.pheight}" />
</template>

