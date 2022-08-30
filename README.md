## 安装使用

- 环境配置
  **本地环境需要安装 pnpm 7.x 、Node.js 14.18+ 和 Git**

- 克隆代码

```bash
git clone https://github.com/Xxcool/study.git
```

- 安装依赖

```bash
pnpm i
```

- 运行

```bash
pnpm vite
```

- 打包

```bash
pnpm build
```

## Git 提交规范

项目已经内置 angular 提交规范，通过 git cz 代替 git commit 命令即可。

git cz 命令需要全局安装 commitizen

```bash
pnpm i -g commitizen
```

## 目录结构

```
├─ public
│ ├─ bmp.pag
│ ├─ favicon.ico
│ ├─ index.html
│ ├─ login.pag
│ └─ login_bmp.pag
├─ src
│ ├─ assets
│ │ ├─ img
│ │ │ ├─ bean_500.png
│ │ │ ├─ bean_five.png
│ │ │ ├─ bean_one.png
│ │ │ ├─ bean_ten.png
│ │ │ ├─ bean_two.png
│ │ │ ├─ close_store.png
│ │ │ ├─ color_pillar.png
│ │ │ ├─ congratulation.png
│ │ │ ├─ draw_btn.png
│ │ │ ├─ draw_wheel.png
│ │ │ ├─ give_up.png
│ │ │ ├─ luck_bg.png
│ │ │ ├─ lucky_title.png
│ │ │ ├─ point_five.png
│ │ │ ├─ point_ten.png
│ │ │ ├─ sorry.png
│ │ │ └─ wheel_toast_1.png
│ │ ├─ styles
│ │ │ └─ theme.less
│ │ └─ logo.png
│ ├─ components
│ │ ├─ CropperImage
│ │ │ └─ index.vue
│ │ ├─ eltTransfer
│ │ │ ├─ index.js
│ │ │ └─ index.vue
│ │ └─ HelloWorld.vue
│ ├─ plugins
│ │ └─ element.js
│ ├─ router
│ │ └─ index.js
│ ├─ store
│ │ └─ index.js
│ ├─ views
│ │ ├─ flow
│ │ │ ├─ components
│ │ │ │ ├─ Configuration.vue
│ │ │ │ ├─ DrawBoard.vue
│ │ │ │ ├─ DrawNode.vue
│ │ │ │ ├─ Drawer.vue
│ │ │ │ └─ config.js
│ │ │ └─ index.vue
│ │ ├─ Home.vue
│ │ ├─ Tree.vue
│ │ ├─ Turntable.vue
│ │ ├─ animation.vue
│ │ ├─ config.js
│ │ ├─ custom-text.vue
│ │ ├─ echarts2.vue
│ │ ├─ excel.vue
│ │ ├─ gaodeMap.vue
│ │ ├─ speak.vue
│ │ └─ vueMap.vue
│ ├─ App.vue
│ └─ main.js
├─ README.md
├─ babel.config.js
├─ commitlint.config.js
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ vite.config.js
├─ vue.config.js
└─ yarn.lock
```
