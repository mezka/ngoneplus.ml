function authService($http){

  this.isAuthenticated = function(){
    var userId = sessionStorage.getItem('userid');

    console.log(userId);

    if(userId)
      return true;
    else {
      return false;
    }
  };

  this.attemptLogin = function(userEmail, userPassword) {

      return $http({
          method: 'POST',
          url: '/api/login',
          data: {
            email: userEmail,
            password: userPassword
          }
      }).then(function(response){
          if (response.status === 200){
              sessionStorage.setItem('userid', response.data.user);
              return response.data;
          }
      }).catch(function(response){
          console.log(response.status);
      });

  };


  this.logout = function(){

    sessionStorage.clear();

    return $http({
        method: 'POST',
        url: '/api/logout'
    }).then(function(response){
        if (response.status === 200){
            console.log(response.data);
            return response.data;
        }
    }).catch(function(response){
        console.log(response.status);
    });
  };


  this.register = function(useremail, userfirstname, userlastname, useraddress1, useraddress2, userpassword){
    return $http({
        method: 'POST',
        url: '/api/register',
        data:{
          useremail: useremail,
          userfirstname: userfirstname,
          userlastname: userlastname,
          useraddress1: useraddress1,
          useraddress2: useraddress2,
          userpassword: userpassword
        }
    }).then(function(response){
        if (response.status === 200){
            console.log(response.data);
            return response.data;
        }
    }).catch(function(response){
        console.log(response.status);
    });
  };




}

angular.module('app').service('authService', authService);
