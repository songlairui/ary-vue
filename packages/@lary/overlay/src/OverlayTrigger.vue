<template>
  <div class="trigger">
    <slot name="trigger"/>
  </div>
</template>
<script>
export default {
  name: "OverlayTrigger",
  props: {
    activeKey: null
  }
};
</script>
