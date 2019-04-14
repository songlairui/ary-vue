<template>
  <div class="overlay-content">
    {{activeKey}} - {{ overType }}
    <slot/>
    <!-- <transition name="fade">
      <div class="mask" v-if="activeKey!==null">Content Bg Mask</div>
    </transition>-->
    <!-- <div id="list-demo" class="demo">
      <transition-group name="list" tag="p">
        <span v-for="item in items" v-bind:key="item" class="list-item">{{ item }}</span>
      </transition-group>
    </div>-->
  </div>
</template>
<script>
export default {
  name: "OverlayContent",
  props: {
    activeKey: null,
    overType: null
  },
  data() {
    return {};
  }
};
</script>
<style lang="less">
.mask {
  background: rgba(0, 0, 0, 0.8);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.list-move {
  transition: transform 1s;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
