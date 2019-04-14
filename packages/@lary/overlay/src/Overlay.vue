<template>
  <Refactor class="overlays" @toggle="handleToggle" :activeKey="activeKey" :overType="overType">
    <slot/>
  </Refactor>
</template>
<script>
import Refactor from "./Refactor";

export default {
  name: "Overlay",
  components: { Refactor },
  data() {
    return {
      activeKey: null,
      overType: null
    };
  },
  methods: {
    handleToggle({ key, overType }) {
      if (this.activeKey === key) {
        this.activeKey = null;
        return;
      }
      this.activeKey = key;
      this.overType = overType;
      console.warn("handleChange", key, overType, this);
    }
  }
};
</script>
