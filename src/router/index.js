/*
 * @Author: your name
 * @Date: 2021-12-29 11:51:36
 * @LastEditTime: 2021-12-30 17:13:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Turntable from "../views/Turntable.vue";
import Animation from "../views/animation.vue";
import VueMap from "../views/vueMap.vue";
import gaode from "../views/gaodeMap.vue";
import Speak from "../views/speak.vue";
import CustomText from "../views/custom-text.vue";
import Flow from "../views/flow";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Turntable",
    name: "Turntable",
    component: Turntable,
  },
  {
    path: "/animation",
    name: "animation",
    component: Animation,
  },
  {
    path: "/vueMap",
    name: "vueMap",
    component: VueMap,
  },
  {
    path: "/speak",
    name: "speak",
    component: Speak,
  },
  {
    path: "/custom-text",
    name: "CustomText",
    component: CustomText,
  },
  {
    path: "/flow",
    name: "Flow",
    component: Flow,
  },
  {
    path: "/gaode",
    name: "gaode",
    component: gaode,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
