'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication',
  function ($scope, $state, $http, $location, $window, Authentication) {
    $scope.authentication = Authentication;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/home');
    }

    $scope.signin = function (isValid) {
      var credentials = {
        email: this.email,
        password: this.password
      };

      $scope.error = null;

      $http.post('/api/auth/signin', credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'global', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);
