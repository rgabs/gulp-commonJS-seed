module.exports = class loginController {
  constructor() {
    console.log('form login constructor');
    this.userName = 'Rahul Gaba';
  }

  initVue() {
    const vm = this;
    new Vue({
      el: '.login-container',
      data: {
        userName: vm.userName
      },
      methods: {
        getFirstName() {
          return vm.userName.split(' ')[0];
        }
      }
    });
  }
}
