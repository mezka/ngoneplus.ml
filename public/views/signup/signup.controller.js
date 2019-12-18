function signupController(authService, $state){
  
  var signup = this;

  signup.currentPage = 0;

  signup.back = function(){
    signup.currentPage--;
  }

  signup.submit = function(){

    if(signup.currentPage >= 1){
      authService.register(signup.user.useremail, signup.user.userfirstname, signup.user.userlastname, signup.user.useraddress1, signup.user.useraddress2, signup.user.userpassword).then(function(data){
        $state.go('home');
      });
    } else {
      signup.currentPage++;
    }
  };
}


angular.module('app').controller('signupController', signupController);
