<template>
  <Refactor
    class="overlays"
    @toggle="handleToggle"
    :activeKey="activeKey"
    :overType="overType"
    :items="items"
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
      console.warn("handleChange", key, overType, this);
      Math.random() > 0.5 ? this.add() : this.remove();
    },
    randomIndex: function() {
      return Math.floor(Math.random() * this.items.length);
    },
    add: function() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++);
    },
    remove: function() {
      this.items.splice(this.randomIndex(), 1);
    }
  },
  created() {
    // setInterval(() => {
    //   Math.random() > 0.5 ? this.add() : this.remove();
    // }, 400);
  }
};
</script>
