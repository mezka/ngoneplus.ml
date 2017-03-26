function loginController(authService, $state){

  this.attempt = function(userEmail, userPassword){

    authService.attemptLogin(userEmail, userPassword).then(function(data){
      if(data){
        $state.go('home');
      }else{
        //TODO FLASH MESSAGE
        console.log('flash wrong password');
      }
    });
  };


  this.isAuthenticated = function(){
    return authService.isAuthenticated();
  };

  this.logout = authService.logout;
}

angular.module('app').controller('loginController', loginController);
