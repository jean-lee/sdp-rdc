<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon.indexOf('el-icon-') > -1) { // element-ui自带icon
      vnodes.push(<i class={[icon, 'sub-el-icon' ]} />)
    } else { // Ali iconfont 下载的icon 字体
      vnodes.push(<i class={[icon, 'iconfont sub-el-icon' ]} />)
    }
    // if (icon) {
    //   if (icon.includes('el-icon')) {
    //     vnodes.push(<i class={[icon, 'iconfont sub-el-icon' ]} />)
    //   } else {
    //     vnodes.push(<svg-icon icon-class={icon}/>)
    //   }
    // }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
  font-size: 18px;
}
</style>
