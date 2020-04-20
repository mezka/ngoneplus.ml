function loginController(authService, $state){

  var login = this;

  login.user = { useremail: '', userpassword: ''};


  login.attempt = function(){

    authService.attemptLogin(login.user.useremail, login.user.userpassword).then(function(data){
      if(data){
        $state.go('userControlPanel');
      }else{
        //TODO FLASH MESSAGE
        console.log('flash wrong password');
      }
    });
  };

  this.logout = authService.logout;
}

angular.module('app').controller('loginController', loginController);
