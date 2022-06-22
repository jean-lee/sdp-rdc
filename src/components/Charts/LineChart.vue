/*
* author: ljx
* date: 2022-01-12
* fileName: PieChart.vue
* description: 饼图 组件
*/

<script>
import * as echarts from 'echarts';
import resize from './mixins/resize'
import { uuid } from '@/utils/index.js'
const chartColors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4',
  '#ea7ccc',
]
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
  name: 'LineChart',
  mixins: [resize],
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  props: {
    chartOptions: { type: Object, default: () => {
        return {
          className: '',
          pwidth: '',
          pheight: '',
          chartData: [],
        }
      }
    },

    autoResize: {
      type: Boolean,
      default: true,
    },
    // // 主标题
    // text: {
    //   type: Object,
    //   default: () => {
    //     return mainTitleVal
    //   },
    // },
    // // 副标题
    // subtext: {
    //   type: String,
    //   default: '',
    // },
    // X 坐标轴代指名称
    xname: {
      type: String,
      default: '时间',
    },
    // Y 坐标轴代指名称
    yname: {
      type: String,
      default: '数值',
    },
    // 图数据
    // chartdata: {
    //   type: [Object, Array],
    //   required: true,
    //   default: () => {
    //     return []
    //   },
    // },
    // // 图表背景色
    // chartbg: {
    //   type: String,
    //   default: 'transparent',
    // },
    // 图在父区域内绘制的位置
    // chartgrid: {
    //   type: Object,
    //   default () {
    //     return {
    //       containLabel: true,
    //       left: '0',
    //       top: '0',
    //       width: 'auto',
    //       height: 'auto',
    //     }
    //   },
    // },
    colors: {
      type: Array,
      default: () => {
        return chartColors
      },
    },
  },
  data() {
    return {
      loading: false,
      chartHook: uuid('linechart_id_', 10),
      chart: null, // 图 实例
      sell: null,
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
      // const { mainTitle, subtext, chartbg, xAxis } = this.chartOptions.chartData
      const { mainTitle, subtext, chartbg, chartgrid, xname, yname, chartData } = this.chartOptions
      // const _paintData = this.chartOptions.chartData || []
      // console.log('_paintData: ', _paintData)

      // const lendList = _paintData.map(item => item.name)
      // const xaxisData = _paintData[0].data.map(item => item.name) // 横坐标
      // const seriesLineArr = [] // 纵坐标
      // _paintData.forEach((item) => {
      //   const _line = {
      //     name: item.name,
      //     data: item.data,
      //     type: 'line',
      //   }
      //   seriesLineArr.push(_line)
      // })

      const chartOptions = {
        animation: true,
        title: {
          text: mainTitle ? (mainTitle.text ? mainTitle.text : '' ) : '',
          left: mainTitle ? (mainTitle.left ? mainTitle.left : 10) : 10,
          top: mainTitle ? (mainTitle.top ? mainTitle.top : 10) : 10,
          // padding: [10],
          // itemGap: 10, // 主副标题纵向间距
          textStyle: mainTitle ? (mainTitle.textStyle ? mainTitle.textStyle : normalFontStyle) 
          : normalFontStyle, // 主标题 样式
          // subtext: subtext || '',
          // subtextStyle: { // 主标题 样式，
          //   align: 'center', // 副标题使用\n设置为多行时的对齐方式
          //   ...normalFontStyle,
          // },
        },
        backgroundColor: chartbg || '#fff',
        tooltip: { // 鼠标hover后的显示
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            snap: true,
          },
          formatter: '{a} <br/>{b} : {c} '
        },
        legend: { // 图标颜色代指提示
          top: 16,
          data: chartData.xAxis.data,
          textStyle: {
            ...normalFontStyle,
          },
        },
        calculable: true,
        grid: chartgrid || {},
        toolbox: {
          right: 20,
          itemSize: 14,
          itemGap: 10,
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          name: xname || '',
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#eee',
              symbol: ['none', 'arrow'],
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              ...normalFontStyle,
            },
          },
          nameTextStyle: {
            ...normalFontStyle,
            fontWeight: 'bold',
          },
          data: chartData.xAxis.data // xaxisData, // 从series中获取X轴坐标
        },
        yAxis: [{
          type: 'value',
          name: this.yname,
          nameTextStyle: {
            ...normalFontStyle,
            fontWeight: 'bold',
          },
          axisLabel: {
            show: true,
            textStyle: {
              ...normalFontStyle,
            },
          },
          axisLine: {
            lineStyle: {
              color: '#eee',
              symbol: ['none', 'arrow'],
            },
          },
          splitLine: {
            lineStyle: {
              color: '#2d2d2d',
              symbol: ['none', 'arrow'],
            },
          },
        }],
        series: chartData.series,
        color: this.colors,
      }

      // console.log('line chartOptions: ', chartOptions )
      this.chart.setOption(chartOptions)
    },
  },
}

</script>

<template>
<!-- v-loading="loading" -->
<div :id="chartHook" :class="chartOptions.className"
  :style="{width: chartOptions.pwidth, height: chartOptions.pheight}"
 />
</template>
