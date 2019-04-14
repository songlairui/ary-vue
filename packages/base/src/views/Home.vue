<template>
  <div class="home">
    <overlay defaultActiveKey="1" @change="callback">
      <overlay-pane tab="Tab 1" key="1" type="overall">Content of Tab Pane 1</overlay-pane>
      <overlay-pane tab="Tab 2" key="2" forceRender>Content of Tab Pane 2</overlay-pane>
      <overlay-pane key="3">
        <span slot="trigger" @click="hello">Tab 3</span>
        Content of Tab Pane 3
      </overlay-pane>
    </overlay>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
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
