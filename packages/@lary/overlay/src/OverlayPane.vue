<template>
  <div class="overlay-pane">
    <slot/>
  </div>
</template>
<script>
export default {
  name: "OverlayPane",
  props: {
    type: null
  }
};
</script>
