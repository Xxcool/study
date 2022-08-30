/** 本地开发用 */
import { defineConfig } from 'vite'
import path from 'path'
import { createVuePlugin } from 'vite-plugin-vue2' // 支持 vue2
// 兼容webpack里面的require.context() 把require.context() 转成 import ... from ...的方式
import viteRequireContext from '@originjs/vite-plugin-require-context'
// 兼容 require引入
import requireTransform from 'vite-plugin-require-transform';

function resolve(dir) {
  return path.join(__dirname, dir)
}
export default defineConfig({
  plugins: [
    createVuePlugin(),
    viteRequireContext(),
    requireTransform({
	    fileRegex:/.js$|.jsx$|.vue$/
    }),
  ],
  server: {
    port: 8089,
    host: '0.0.0.0', // 指定服务器应该监听哪个IP地址，如果将此设置成'0.0.0.0'将监听所有地址
    strictPort: true, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    open: true // boolean | string 在开发服务器启动时自动在浏览器中打开应用程序。当此值为字符串时，会被用作 URL 的路径名。若你想指定喜欢的浏览器打开服务器，你可以设置环境变量 process.env.BROWSER（例如：firefox）
  },
  resolve: {
    extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': resolve('src')
    },
    mainFields: ['module', 'main', 'jsnext:main', 'jsnext'] // 解决预构建获取入口文件顺序
  }
})
