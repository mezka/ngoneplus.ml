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


  this.currentUserId = function(){
    return authService.currentUserId();
  };

  this.logout = authService.logout;


}

angular.module('app').controller('loginController', loginController);
