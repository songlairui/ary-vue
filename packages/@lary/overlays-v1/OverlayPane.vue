<template>
  <div class="overlay-pane">
    <div class="trigger" :class="{active:active}" @click="emitTrigger" :style="activeStyle">
      <slot name="trigger" :active="active"/>
    </div>
    <transition :name="animation" mode="in-out">
      <div class="pane" v-show="active" v-overlay="type">
        <slot :close="closeMe" :active="active"/>
        <div class="pane-mask" v-if="mask" @click="abort"></div>
      </div>
    </transition>
  </div>
</template>
<script>
import OverlayDirective from "./directive/overlay";

export default {
  name: "OverlayPane",
  props: {
    currentKey: null,
    type: null,
    mask: {
      type: Boolean,
      default: true
    },
    activeColor: {
      type: String,
      default: "#248BF2"
    },
    animation: {
      type: String,
      default: "none"
    }
  },
  directives: {
    overlay: OverlayDirective
  },
  computed: {
    active() {
      return this.currentKey === this.$vnode.key;
    },
    activeStyle() {
      return this.active
        ? {
            color: this.activeColor
          }
        : "";
    }
  },
  methods: {
    emitTrigger() {
      // 如果已经激活，则点击关闭弹层
      this.$parent.$emit("change", this.active ? null : this.$vnode.key);
    },
    closeMe() {
      if (this.active) {
        this.$parent.$emit("change", null);
      }
    },
    abort() {
      this.$parent.$emit("abort", null);
      this.closeMe();
    }
  }
};
</script>
<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<style lang="less" scoped>
.overlay-pane {
  position: relative;
  .trigger {
    height: 100%;
  }
  .pane {
    position: fixed;
    left: 0;
    width: 100%;
    .pane-mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(4, 8, 13, 0.5);
      z-index: -1;
    }
  }
}
</style>

