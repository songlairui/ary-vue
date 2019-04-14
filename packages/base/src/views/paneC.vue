<template>
  <div class="panel-c" @click="debug">{{ title }}</div>
</template>
<script>
export default {
  name: "panelC",
  data() {
    return {
      title: "p c"
    };
  },
  methods: {
    debug() {
      console.info(this);
    }
  }
};
</script>

