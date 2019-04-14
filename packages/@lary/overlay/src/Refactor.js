import Vue from 'vue'
import get from 'lodash/get'
import OverlayContent from './OverlayContent'
import OverlayTrigger from './OverlayTrigger'
import { filterEmpty } from './_utils/props-util'

function wrapTrigger(h, context, child, payload, key) {
  return h(
    'span',
    {
      key,
      slot: 'trigger',
      class: ['a'],
      style: {
        display: 'block'
      },
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
    overType: null,
    items: Array
  },
  render(h, context) {
    const children = filterEmpty(context.children)
    const triggerChildren = []
    const contentChildren = []
    console.info('children', context)
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
          wrapTrigger(h, context, label, { key, overType }, key)
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
            h(
              'div',
              {
                class: ['overlay-item', 'list-item'],
                key
              },
              [subVNode]
            )
          )
        }
      })
    })
    const subCtxData = {
      props: { ...context.props }
    }
    // <transition-group name="list" tag="p">
    // reord contentChildren by activeKey
    const idx = contentChildren.findIndex(
      (vNode) => vNode.data.key === context.props.activeKey
    )
    let reOrdered = [...contentChildren]
    if (idx > 0) {
      reOrdered = contentChildren
        .concat(contentChildren)
        .slice(idx, idx + contentChildren.length)
    } else if (idx === -1) {
      reOrdered.unshift(
        h(
          'div',
          {
            class: ['overlay-item', 'list-item'],
            key: 'blank'
          },
          '---'
        )
      )
      console.warn('TODO')
    }

    console.info(triggerChildren, reOrdered)
    return h('div', context.data, [
      h(OverlayTrigger, subCtxData, triggerChildren),
      h(OverlayContent, subCtxData, [
        h(
          'transition-group',
          {
            props: {
              name: 'list',
              tag: 'p'
            }
          },
          reOrdered
        ),
        h(
          'transition',
          { props: { name: 'fade' } },
          context.props.activeKey === null
            ? []
            : [h('div', { class: 'mask' }, 'Content Bg Mask')]
        ),
        // <transition name="fade">
        //   {context.props.activeKey !== null && (
        //     <div class="mask">Content Bg Mask</div>
        //   )}
        // </transition>,
        h(
          'transition-group',
          {
            props: {
              name: 'list',
              tag: 'p'
            }
          },
          context.props.items.map((item) =>
            h('span', { key: item, class: 'list-item' }, item)
          )
        )
        // <transition-group name="list" tag="p">
        //   {context.props.items.map(function(item) {
        //     return (
        //       <span key={item} class="list-item">
        //         {item}
        //       </span>
        //     )
        //   })}
        // </transition-group>
      ])
    ])
  }
}
