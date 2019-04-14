import { filterEmpty } from '../overlay/src/_utils/props-util'

export default {
  functional: true,
  props: {
    currentKey: null,
    animation: null,
    mask: null
  },
  render: function(h, context) {
    const children = filterEmpty(context.children)
    // 添加 key， 添加 propsData
    return children.map((vNode, idx) => {
      if (!vNode.key) {
        vNode.key = idx
      }
      if (
        context.props.mask !== undefined &&
        vNode.componentOptions.propsData.mask === undefined
      ) {
        vNode.componentOptions.propsData.mask = context.props.mask
      }
      vNode.componentOptions.propsData.currentKey = context.props.currentKey
      vNode.componentOptions.propsData.animation = context.props.animation
      return vNode
    })
  }
}
