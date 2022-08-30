import eltTransfer from './index.vue'

eltTransfer.install = function (Vue) {
  Vue.component(eltTransfer.name, eltTransfer)
}

export default eltTransfer
