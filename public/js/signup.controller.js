function signupController(authService, $state){
  this.register = function(user){

    console.log(user);

    authService.register(user.useremail, user.userfirstname, user.userlastname, user.useraddress1, user.useraddress2, user.userpassword).then(function(data){
      $state.go('home');
    });
  };
}


angular.module('app').controller('signupController', signupController);
