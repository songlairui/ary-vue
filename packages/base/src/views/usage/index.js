import O1 from './overlay-v1.vue'
import O2 from './overlay-v2.vue'

export default {
  name: 'home',
  render(h) {
    return (
      <div class="overlay-usage">
        <h1>Overlay Usage</h1>
        <h2>overlay v1</h2>
        <O1 />
        排序和筛选切换时,mask抖动,因为是两个DOM节点
        <h2>overlay v2</h2>
        <O2 />
      </div>
    )
  }
}
