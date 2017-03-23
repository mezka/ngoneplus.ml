function authService($http){

  this.currentUserId = function(){
    var data = sessionStorage.getItem('userid');
    return data;
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


  this.register = function(useremail, username, userlastname, useraddress1, useraddress2){
    return $http({
        method: 'POST',
        url: '/api/register',
        data:{
          useremail: useremail,
          username: username,
          userlastname: userlastname,
          useraddress1: useraddress1,
          useraddress2: useraddress2
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
