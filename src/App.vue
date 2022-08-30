<!--
 * @Author: your name
 * @Date: 2021-12-29 11:51:36
 * @LastEditTime: 2021-12-30 17:13:05
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo\src\App.vue
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <!-- <router-link to="/vueMap">Vue Map</router-link> | -->
      <router-link to="/speak">speak</router-link> |
      <router-link to="/custom-text">CustomText</router-link> |
      <router-link to="/flow">flow</router-link> |
      <router-link to="/animation">animation</router-link> |
      <router-link to="/gaode">gaode</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 50px;
}

#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: var(--color);

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
