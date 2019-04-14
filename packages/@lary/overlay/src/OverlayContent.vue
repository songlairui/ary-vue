<template>
  <div class="overlay-content">
    <slot/>
    <transition name="fade">
      <div class="mask" v-if="activeKey!==null"></div>
    </transition>
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
<style lang="less" scoped>
@deep: ~">>>";
.overlay-content {
  color: #fff;
  position: relative;
  min-height: 100px;
  @{deep} .group {
    position: relative;
    z-index: 1;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    > .list-item {
      flex: 1 0 100%;
    }
    .blank {
      height: 0;
      flex: 0 0 0;
    }
  }

  @{deep} .mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
}
</style>

<style lang="less">
.mask {
  background: rgba(0, 0, 0, 0.3);
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
  transition: transform 0.3s;
}

// .list-item {
//   display: inline-block;
//   margin-right: 10px;
// }
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
