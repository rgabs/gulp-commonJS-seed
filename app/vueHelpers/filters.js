'use strict';
Vue.filter('limit', (arr, limit) => {
  return arr.slice(0, limit)
});
Vue.filter('startfrom', (arr = [], startIndex) => {
  return arr.slice(startIndex)
});
