function authService($http) {
  return {
    isAuthenticated: function () {
      return $http({
        method: 'GET',
        url: '/api/login/check'
      })
      .then(function(response){
        console.log(response.data);
      })
      .catch(function(error){
        console.log(error.data);
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
        if (response.status === 200) {
          sessionStorage.setItem('userid', response.data.user);
          return response.data;
        }
      }).catch(function (response) {
        console.log(response.status);
      });
    },

    logout: function () {
  
      sessionStorage.clear();
  
      return $http({
        method: 'POST',
        url: '/api/logout'
      }).then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          return response.data;
        }
      }).catch(function (response) {
        console.log(response.status);
      });
    },

    register: function (useremail, userpassword, userfirstname, userlastname, errorCallback = () => {}, successCallback = () => {}) {
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
        if (response.status === 200) {
          console.log(response.data);
          return successCallback();
        }
      }).catch(function(response) {
        console.log(response.status);
        return errorCallback();
      });
    }
  };
}

angular.module('app').service('authService', authService);
