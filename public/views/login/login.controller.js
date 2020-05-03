function loginController(authService, $state, Flash){

  var login = this;

  login.user = { useremail: '', userpassword: ''};

  login.attempt = function(){

    authService.attemptLogin(login.user.useremail, login.user.userpassword)
    .then(function(data){
        $state.go('usercp');
    })
    .catch(function(error){
        if(error.status === 401){
          Flash.clear();
          Flash.create('danger', error.data.message, 3000, {container: 'flash-fixed'}, false);
        }
    });
  };

  this.logout = authService.logout;
}

angular.module('app').controller('loginController', loginController);