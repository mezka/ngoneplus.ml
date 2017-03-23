function signupController(authService){
  this.register = function(useremail, username, userlastname, useraddress1, useraddress2, password){
    authService.register(useremail, username, userlastname, useraddress1, useraddress2, password).then(function(data){
      console.log(data);
    });
  };
}


angular.module('app').controller('signupController', signupController);
