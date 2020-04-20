function signupController(authService, $state){
  
  var signup = this;

  signup.submit = function(){
    authService.register(
      signup.user.useremail,
      signup.user.userpassword,
      signup.user.userfirstname,
      signup.user.userlastname,
      null,
      $state.go.bind(this, 'login')
    );
  };
};


angular.module('app').controller('signupController', signupController);
