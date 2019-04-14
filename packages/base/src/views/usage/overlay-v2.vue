<template>
  <overlay defaultActiveKey="1" @change="callback">
    <overlay-pane tab="Tab 1" key="1" type="overall">Content of Tab Pane 1</overlay-pane>
    <overlay-pane tab="Tab 2" key="2" forceRender>Content of Tab Pane 2</overlay-pane>
    <overlay-pane key="3">
      <span slot="trigger" @click="hello">Tab 3</span>
      <pane-c :hello="hello"/>
    </overlay-pane>
  </overlay>
</template>

<script>
import PaneC from "@/components/PaneC.vue";

export default {
  components: {
    PaneC
  },
  methods: {
    callback(e) {
      console.info("callback", e);
    },
    hello(e) {
      console.info("hello", e, this);
    }
  }
};
</script>
