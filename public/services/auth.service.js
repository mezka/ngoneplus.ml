function authService($http) {
  return {
    isAuthenticated: function () {
      return $http({
        method: 'GET',
        url: '/api/login/check'
      })
      .then(function(response){
        console.log(response.data);
        return true
      })
      .catch(function(error){
        console.log(error.data);
        return Promise.reject(false);
      });
    },
  
    attemptLogin: function (userEmail, userPassword) {
  
      return $http({
        method: 'POST',
        url: '/api/login',
        data: {
          email: userEmail,
          password: userPassword
        }
      }).then(function (response) {
          return response.data;
      });
    },

    logout: function () {
  
      return $http({
        method: 'POST',
        url: '/api/logout'
      }).then(function (response) {
          return response.data;
      }).catch(function (response) {
        console.log(response.status);
      });
    },

    register: function (useremail, userpassword, userfirstname, userlastname) {
      return $http({
        method: 'POST',
        url: '/api/register',
        data: {
          useremail: useremail,
          userpassword: userpassword,
          userfirstname: userfirstname,
          userlastname: userlastname
        }
      }).then(function(response) {
        return response.data
      }).catch(function(error) {
        console.log(error.data)
      });
    }
  };
}

angular.module('app').service('authService', authService);
