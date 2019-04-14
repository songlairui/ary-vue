import Overlay from './Overlay'
import OverlayPane from './OverlayPane'
import OverlayContent from './OverlayContent'

Overlay.install = function(Vue) {
  ;[Overlay, OverlayPane, OverlayContent].forEach((comp) => {
    Vue.component(comp.name, comp)
  })
}
Overlay.Pane = OverlayPane
Overlay.Content = OverlayContent

export default Overlay

export { OverlayPane, OverlayContent }
