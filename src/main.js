import Vue from 'vue'
import App from './App.vue'
require('../node_modules/bootstrap/dist/css/bootstrap.css')
require('./assets/style.css')

new Vue({
  el: '#app',
  render: h => h(App)
});
