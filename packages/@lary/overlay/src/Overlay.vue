<template>
  <Refactor class="overlays">
    <slot/>
  </Refactor>
</template>
<script>
import Refactor from "./Refactor";

export default {
  name: "Overlay",
  components: { Refactor }
};
</script>
