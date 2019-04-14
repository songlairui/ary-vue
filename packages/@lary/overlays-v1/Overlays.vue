<template>
  <div class="overlays">
    <f-overlay :currentKey="currentKey" :animation="animation" :mask="mask">
      <slot/>
    </f-overlay>
  </div>
</template>
<script>
import FOverlay from "./FOverlay";

export default {
  name: "Overlays",
  props: {
    animation: String,
    mask: {
      type: Boolean,
      default: true
    }
  },
  components: {
    FOverlay
  },
  data() {
    return {
      currentKey: null
    };
  },
  methods: {
    handleChange(activeKey) {
      this.currentKey = activeKey;
    }
  },
  created() {
    this.$on("change", this.handleChange);
  }
};
</script>
<style scoped>
.overlays {
  display: flex;
  overflow: auto;
  height: 100%;
}
</style>

