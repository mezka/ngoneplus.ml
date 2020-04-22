function signupController(authService, $state){
  
  var signup = this;

  signup.submit = function(){
    authService.register(
      signup.user.useremail,
      signup.user.userpassword,
      signup.user.userfirstname,
      signup.user.userlastname,
    )
    .then(function(data){
      $state.go('userControlPanel');
    })
  };
};


angular.module('app').controller('signupController', signupController);
