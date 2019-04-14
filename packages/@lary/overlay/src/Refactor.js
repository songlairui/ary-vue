import get from 'lodash/get'
import OverlayContent from './OverlayContent'
import OverlayTrigger from './OverlayTrigger'
import { filterEmpty } from './_utils/props-util'

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
    children.forEach((vNode, idx) => {
      if (!vNode.componentOptions) {
        console.info(vNode)
        return
      }
      let label = get(vNode, 'data.attrs.tab')
      const key = get(vNode, 'data.key', idx)
      const overType = get(vNode, 'componentOptions.propsData.type')
      if (label) {
        triggerChildren.push(
          <span
            key={key}
            slot="trigger"
            onClick={() => {
              const payload = { key, overType }
              context.listeners.toggle(payload)
              context.parent.$emit('change', payload)
            }}
          >
            {label}
          </span>
        )
      }
      const subChild = get(vNode, 'componentOptions.children', [])
      subChild.forEach((subVNode) => {
        if (subVNode.data && subVNode.data.slot === 'trigger') {
          subVNode.context = h('span').context // hacking
          subVNode.data.key = key
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
            <div class={['overlay-item', 'list-item']} key={key}>
              {subVNode}
            </div>
          )
        }
      })
    })
    const subCtxData = {
      props: { ...context.props }
    }

    let reOrdered = [
      <div class={['overlay-item', 'list-item', 'blank']} key="blank" />,
      ...contentChildren
    ]
    // reord contentChildren by activeKey, activeKey 在第一个显示
    const idx = reOrdered.findIndex(
      (vNode) => vNode.data.key === context.props.activeKey
    )

    if (idx > 0) {
      reOrdered = reOrdered.concat(reOrdered).slice(idx, idx + reOrdered.length)
    }
    return (
      <div {...context.data}>
        <OverlayTrigger {...subCtxData}>{triggerChildren}</OverlayTrigger>
        <OverlayContent {...subCtxData}>
          <transition-group
            class="group"
            name="list"
            tag="div"
            style={context.props.activeKey === null && { display: 'none' }}
          >
            {reOrdered}
          </transition-group>
        </OverlayContent>
      </div>
    )
  }
}
