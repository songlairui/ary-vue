<template>
  <div class="overlay-content">
    {{activeKey}} - {{ overType }}
    <slot/>
    <div class="mask" v-if="activeKey!==null">Content Bg Mask</div>
  </div>
</template>
<script>
export default {
  name: "OverlayContent",
  props: {
    activeKey: null,
    overType: null
  }
};
</script>
