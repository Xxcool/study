<!--
 * @Author: your name
 * @Date: 2021-12-29 11:52:48
 * @LastEditTime: 2021-12-29 12:00:18
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo\README.md
-->
node_modules：下载的依赖包
public：公共的基础文件
src：项目主体部分
api：请求接口统一管控，当需要更改接口时能更快的找到
assets：项目中所需引入资源的文件，font/img/js/...
components：当有重复的组件时，提取出来，放在此文件夹
config：存放一些配置文件
directive：自定义指令文件
lib：存放一些公用的方法
mock：个人认为比较重要的文件，当前后端统一定义好接口时，mock可极大的提高开发效率，这也是最近讨论比较多的面向接口开发
router：路由文件
store：数据管控文件
views：页面文件
app.vue：vue入口文件
main.js：项目主js文件
.browserslistrc：指定了项目的目标浏览器的范围。这个值会被 @babel/preset-env 和 Autoprefixer 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀
.editorconfig：编辑器配置文件，需要vscode下载editorconfig for vs code插件使用
.eslintrc.js：eslint配置文件
.gitignore：上传到git时忽略的文件
.babel.config.js：babel转义配置文件
package-lock.json：锁定安装时的包的版本号，并且需要上传到git，以保证其他人在npm install时大家的依赖能保证一致
package.json：项目依赖的部分
postcss.config.js：postcss配置项
REACME.md：项目的说明书
vue.config.js：项目的主要配置文件