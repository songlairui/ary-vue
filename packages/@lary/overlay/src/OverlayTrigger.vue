<template>
  <div class="trigger">
    {{ activeKey }}
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
