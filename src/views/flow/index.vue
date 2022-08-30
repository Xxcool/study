<template>
  <div>
    <div class="flows-wrapper">
      <Configuration @addNode="addNode" />
      <DrawBoard ref="drawer" />
      <Drawer :drawerOpen="drawerOpen" @beforeClose="drawerOpen = false" />
    </div>
    <el-button type="primary" @click="drawerOpen = true">open</el-button>
  </div>
</template>

<script>
import Configuration from "./components/Configuration";
import DrawBoard from "./components/DrawBoard";
import Drawer from "./components/Drawer";
export default {
  components: {
    Configuration,
    DrawBoard,
    Drawer,
  },
  data() {
    return {
      drawerOpen: false,
    };
  },
  methods: {
    addNode(val) {
      this.$refs.drawer.addNode(val)
    }
  },
};
</script>

<style lang="less" scoped>
.flows-wrapper {
  display: flex;
}
</style>
