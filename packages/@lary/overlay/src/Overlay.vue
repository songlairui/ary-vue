<template>
  <Refactor
    class="overlays"
    @toggle="handleToggle"
    :activeKey="activeKey"
    :overType="overType"
  >
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
      overType: null,

      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10
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
    }
  },
  created() {}
};
</script>
