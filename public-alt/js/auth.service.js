function authService($http){

  this.currentUserId = null;

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
              this.currentUserId = response.data.user;
              return response.data;
          }
      }).catch(function(response){
        if(response.status !== 200){
          console.log(response.status);
        }
      });

  };
}

angular.module('app').service('authService', authService);
