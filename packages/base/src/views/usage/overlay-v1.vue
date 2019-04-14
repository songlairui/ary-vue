<template>
  <overlays animation="fade">
    <overlay-pane key="search" type="overall">
      <template v-slot:trigger="{active}">{{ active ? '-?-' :'搜索'}}</template>
      <template v-slot:default="overlay">
        <div class="p1">p1 {{ uuid }}</div>
      </template>
    </overlay-pane>
    <overlay-pane key="sort" type="overtoBottom" :mask="true">
      <span slot="trigger">排序</span>
      <template v-slot:default="overlay">
        <div class="p2">p2 {{ uuid }} {{ sortTypeAPIKey }}</div>
      </template>
    </overlay-pane>
    <overlay-pane key="filter">
      <span slot="trigger">筛选</span>
      <template v-slot:default="overlay">
        <div class="p3">p3 {{ uuid }}</div>
      </template>
    </overlay-pane>
  </overlays>
</template>
<script>
import Overlays from "@lary/overlays-v1";

export default {
  components: {
    Overlays,
    OverlayPane: Overlays.Pane
  },
  data() {
    return {
      uuid: "old-overlay",
      sortTypeAPIKey: "A"
    };
  }
};
</script>
<style scoped>
[class^="p"] {
  min-height: 50px;
  background: silver;
}
</style>
