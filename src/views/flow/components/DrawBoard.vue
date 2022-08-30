<template>
  <div class="layout">
    <!-- <div class="tools">
      <el-tooltip class="item" effect="dark" content="放大" placement="bottom">
        <i class="el-icon-zoom-in" @click="zoomFn(0.2)" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="缩小" placement="bottom">
        <i class="el-icon-zoom-out" @click="zoomFn(-0.2)" />
      </el-tooltip>
    </div> -->
    <div
      id="draw-container"
      class="graph-main-container x6-graph x6-graph-pannable"
    ></div>
    <div class="mini-map">
      <div class="panel-area-container">
        <div id="minimap"></div>
      </div>
    </div>
  </div>
</template>

<script src="https://unpkg.com/@antv/x6/dist/x6.js"></script>
<script>
import drawNode from "./DrawNode";
export default {
  components: {
    drawNode,
  },
  data() {
    return {
      graph: null,
    };
  },
  mounted() {
    this.initX6();
  },
  methods: {
    initX6() {
      this.graph = new X6.Graph({
        container: document.getElementById("draw-container"), //这是画布需要挂载得ID名字
        // width: 1000, //画布宽度
        // height: "100%", //画布高度
        grid: {
          // 网格设置
          size: 20, // 网格大小 10px
          visible: true, // 渲染网格背景
          type: "mesh",
          args: {
            color: "#D0D0D0",
            thickness: 1, // 网格线宽度/网格点大小
            factor: 10,
          },
        },
        autoResize: true, //跟随窗口自动变化大小
        // 平移
        panning: true,
        // 键盘快捷键 Keyboard
        // https://x6.antv.vision/zh/docs/tutorial/basic/keyboard/#gatsby-focus-wrapper
        keyboard: {
          enabled: true,
          global: true,
        },
        // 点选/框选，默认禁用。
        selecting: {
          enabled: true,
          showNodeSelectionBox: true,
          // https://x6.antv.vision/zh/docs/tutorial/basic/selection
          rubberband: true, // 启用框选
          modifiers: "ctrl", // 组合键
        },
        // 对齐线
        snapline: true,
        // 可以通过 highlighting 选项来指定触发某种交互时的高亮样式
        // https://x6.antv.vision/zh/docs/api/graph/interaction/#highlighting
        highlighting: {
          // 当链接桩可以被链接时，在链接桩外围渲染一个 2px 宽的红色矩形框
          magnetAvailable: {
            name: "stroke",
            args: {
              padding: 4,
              attrs: {
                "stroke-width": 4,
                stroke: "skyblue",
              },
            },
          },
          // 连线过程中，自动吸附到链接桩时被使用
          magnetAdsorbed: {
            name: "stroke",
            args: {
              padding: 4,
              attrs: {
                "stroke-width": 8,
                stroke: "skyblue",
              },
            },
          },
        },
        // 滚轮缩放
        mousewheel: {
          enabled: true,
          modifiers: ["ctrl", "meta"],
        },
        scroller: {
          // enabled: true,
        },
        // 迷你地图
        minimap: {
          enabled: true,
          container: document.getElementById("minimap"),
          padding: 40,
        },
        // 配置全局的连线规则
        // https://x6.antv.vision/zh/docs/api/graph/interaction
        connecting: {
          // 自动吸附
          snap: true,
          // 不允许连接到画布空白位置的点
          allowBlank: false,
          // 不允许创建循环连线
          allowLoop: false,
          // 不允许在相同的起始节点和终止之间创建多条边
          allowMulti: false,
          // 高亮显示所有可用的连接桩或节点
          // https://x6.antv.vision/zh/docs/tutorial/basic/interacting/#highlight
          highlight: true,
          // 当连接到节点时，通过 sourceAnchor 来指定源节点的锚点。
          sourceAnchor: {
            name: "center",
          },
          // 当连接到节点时，通过 targetAnchor 来指定目标节点的锚点。
          targetAnchor: "center",
          // 指定连接点，默认值为 boundary。
          connectionPoint: "anchor",
          // 连接器将起点、路由返回的点、终点加工为 元素的 d 属性，决定了边渲染到画布后的样式，默认值为 normal。
          connector: {
            name: "rounded",
            args: {
              radius: 20,
            },
          },
          // 路由将边的路径点 vertices 做进一步转换处理，并在必要时添加额外的点，然后返回处理后的点，默认值为 normal。
          router: "manhattan",
          // https://x6.antv.vision/zh/docs/tutorial/basic/interacting/#validatemagnet
          // 判断是否新增边
          validateMagnet({ magnet }) {
            const portGroup = magnet.getAttribute("port-group");
            return portGroup !== "in";
          },
          // 连接的过程中创建新的边
          createEdge() {
            return this.createEdge({
              zIndex: -1,
              attrs: {
                line: {
                  strokeDasharray: "5 5",
                  stroke: "#7c68fc",
                  strokeWidth: 2,
                  targetMarker: {
                    name: "block",
                    args: {
                      size: "6",
                    },
                  },
                },
              },
            });
          },
          // https://x6.antv.vision/zh/docs/tutorial/basic/interacting/#validateconnection
          // 在移动边的时候判断连接是否有效，如果返回 false，当鼠标放开的时候，不会连接到当前元素，否则会连接到当前元素。
          validateConnection({
            targetView,
            sourceMagnet,
            targetMagnet,
            sourceCell,
          }) {
            if (!sourceMagnet || !targetMagnet) {
              return false;
            }
            if (sourceCell.getData()?.disableMove) return false;
            // 判断目标链接桩是否可连接
            const portId = targetMagnet.getAttribute("port");
            const node = targetView.cell;
            const port = node.getPort(portId);
            if (!port) {
              return false;
            }
            return true;
          },
        },
      });
    },
    zoomFn(num) {
      this.graph.zoom(num);
    },
    addNode(option) {
      const p = this.graph.pageToLocal(option.x, option.y);
      this.graph.addNode(Object.assign({}, option, p));
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: calc(100% - 360px);
  height: calc(100vh - 300px);
  margin-left: 32px;
  position: relative;
  .graph-main-container {
    width: 100%;
    height: 100%;
    flex: 1;
  }
}
.x6-graph {
  position: relative;
  outline: none;
}
.flow-container {
  margin-left: 24px;
  position: relative;
  outline: none;
}
.mini-map {
  position: absolute;
  right: 0;
  bottom: 0;
  .panel-area-container {
    padding: 5px;
    min-width: 300px;
    background: #f6f6f6;
  }
}
</style>
