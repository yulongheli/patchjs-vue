import Vue from 'vue';
import Detail from './Detail.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(Detail),
}).$mount('#app');
