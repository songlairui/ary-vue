import get from 'lodash/get'
import OverlayContent from './OverlayContent'
import { filterEmpty } from './_utils/props-util'

export default {
  functional: true,
  render(h, context) {
    const children = filterEmpty(context.children)
    const triggerChildren = []
    const contentChildren = []
    console.info('children', children)
    children.forEach((vNode) => {
      let label = get(vNode, 'data.attrs.tab')
      console.info('a', label, vNode)
      if (label) {
        triggerChildren.push(h('span', label))
      }
      const subChild = get(vNode, 'componentOptions.children', [])
      subChild.forEach((subVNode) => {
        if (subVNode.data && subVNode.data.slot === 'trigger') {
          triggerChildren.push(subVNode)
          delete subVNode.data.slot
        } else {
          contentChildren.push(subVNode)
        }
      })
    })
    console.info('triggerChildren', triggerChildren)
    return h('div', context.data, [
      h('div', { class: 'trigger' }, triggerChildren),
      h(OverlayContent, { class: 'content' }, contentChildren)
    ])
  }
}
