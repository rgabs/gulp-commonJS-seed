window.VueInstance = new Vue();
const loginController = require('./loginController');
require('../../vueHelpers/directives')

const loginRef = new loginController();

loginRef.initVue();
