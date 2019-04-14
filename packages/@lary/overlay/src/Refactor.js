import Vue from 'vue'
import get from 'lodash/get'
import OverlayContent from './OverlayContent'
import OverlayTrigger from './OverlayTrigger'
import { filterEmpty } from './_utils/props-util'

function wrapTrigger(h, context, child, payload) {
  return h(
    'span',
    {
      slot: 'trigger',
      on: {
        click() {
          context.listeners.toggle(payload)
        }
      }
    },
    child
  )
}

export default {
  functional: true,
  props: {
    activeKey: null,
    overType: null
  },
  render(h, context) {
    const children = filterEmpty(context.children)
    const triggerChildren = []
    const contentChildren = []
    console.info('children', context)
    children.forEach((vNode, idx) => {
      let label = get(vNode, 'data.attrs.tab')
      const key = get(vNode, 'data.key', idx)
      const overType = get(vNode, 'componentOptions.propsData.type')
      if (label) {
        triggerChildren.push(wrapTrigger(h, context, label, { key, overType }))
      }
      const subChild = get(vNode, 'componentOptions.children', [])
      subChild.forEach((subVNode) => {
        if (subVNode.data && subVNode.data.slot === 'trigger') {
          subVNode.context = h('span').context // hacking
          if (!subVNode.data.on) {
            subVNode.data.on = {}
          }
          const old = subVNode.data.on.click
          subVNode.data.on.click = function(e) {
            old && old(e)
            context.listeners.toggle({ key, overType })
          }
          triggerChildren.push(subVNode)
          // triggerChildren.push(wrapTrigger(h, context, [subVNode], key))
        } else {
          contentChildren.push(
            h('div', { class: 'overlay-item', key }, [subVNode])
          )
        }
      })
    })
    const subCtxData = {
      props: { ...context.props }
    }
    return h('div', context.data, [
      h(OverlayTrigger, subCtxData, triggerChildren),
      h(OverlayContent, subCtxData, contentChildren)
    ])
  }
}
