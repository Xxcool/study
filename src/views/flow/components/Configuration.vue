<template>
  <div class="configuration-wrapper">
    <div class="config-item" v-for="item in configList">
      <span class="config-item-title">{{ item.label }}</span>
      <el-scrollbar>
        <div class="config-option_content">
          <div
            class="config-option"
            v-for="option in item.children"
            draggable="true"
            @dragend="dragend(option)"
          >
            <img :src="option.img" />
            <span>{{ option.label }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
const mouseXY = {'x': null, 'y': null}

export default {
  data() {
    return {
      configList: [
        {
          label: "流程用户",
          value: "1",
          children: [
            {
              label: "全部用户",
              value: "1-1",
              img: "",
            },
            {
              label: "公众号用户",
              value: "1-2",
              img: "",
            },
            {
              label: "群组用户",
              value: "1-3",
              img: "",
            },
            {
              label: "自定义用户",
              value: "1-4",
              img: "",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    document.getElementById('draw-container').addEventListener('dragover', function (e) {
      mouseXY.x = e.clientX
      mouseXY.y = e.clientY
    }, false)
  },
  methods: {
    nodeConfig(item, x, y) {
      let config = ''
      const time = new Date().getTime();

      config = {
        x: x,
        y: y,
        width: 48,
        height: 48,
        // shape: "dag-node",
        data: item,
        ports: {
          groups: {
            top: {
              position: "top",
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: "#C2C8D5",
                  strokeWidth: 2,
                  fill: "#fff",
                },
              },
            },
            bottom: {
              position: "bottom",
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: "#C2C8D5",
                  strokeWidth: 2,
                  fill: "#fff",
                },
              },
            },
          },
          items: [
            {
              id: `in-${time}`,
              group: "top", // 指定分组名称
            },
            {
              id: `out-${time}`,
              group: "bottom", // 指定分组名称
            },
          ],
        },
      }
      return config
    },
    dragend(item) {
      const parentRect = document
        .getElementById("draw-container")
        .getBoundingClientRect();
      let mouseInGrid = false;
      if (
        mouseXY.x > parentRect.left &&
        mouseXY.x < parentRect.right &&
        mouseXY.y > parentRect.top &&
        mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true;
      }
      if (mouseInGrid === true) {
        this.$emit("addNode", this.nodeConfig(item, mouseXY.x, mouseXY.y));
      }
    },
  },
};
</script>

<style lang="less" scoped>
.configuration-wrapper {
  width: 280px;
  border: 1px solid #ccc;
  .config-item {
    display: flex;
    flex-direction: column;
    .config-item-title {
      height: 44px;
      padding-left: 16px;
      display: flex;
      align-items: center;
      background-color: #ebebeb;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 14px;
        width: 4px;
        height: 16px;
        background-color: #4d00e0;
      }
    }
    .config-option_content {
      display: grid;
      grid-gap: 24px;
      padding: 16px 24px;
      grid-template-columns: repeat(auto-fit, 60px);
    }
    .config-option {
      width: 60px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        width: 48px;
        height: 48px;
        margin-bottom: 8px;
      }
    }
  }
}
</style>

<style lang="less">
.el-scrollbar__wrap {
  overflow-x: hidden;
  .el-scrollbar__view {
    height: 200px;
  }
}
</style>
