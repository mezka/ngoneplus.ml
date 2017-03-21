function loginController(authService, $state){

  this.attempt = function(userEmail, userPassword){

    authService.attemptLogin(userEmail, userPassword).then(function(data){
      if(data){
        // $state.go('home', {});
        console.log(data);
      }else{
        //TODO FLASH MESSAGE
        console.log('flash wrong password');
      }
    });
  };

}

angular.module('app').controller('loginController', loginController);
