<template>
  <div>
    <el-drawer
      title="title"
      :visible.sync="drawerOpen"
      :direction="direction"
      custom="custom-drawer"
      :before-close="handleClose"
    >
      <div class="drawer__content">
        <el-form> </el-form>
        <div class="drawer__footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    drawerOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      direction: "rtl",
    };
  },
  methods: {
    handleClose() {
      this.$emit('beforeClose')
    }
  },
};
</script>
