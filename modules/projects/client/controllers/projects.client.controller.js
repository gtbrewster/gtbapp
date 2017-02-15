'use strict';

// Projects controller
angular.module('projects').controller('ProjectsControllers', ['$scope', '$stateParams', '$location', 'Projects',
  function ($scope, $stateParams, $location, Projects) {
      //TODO $scope.findTeamMembers
      //   $scope.find = function() {
      //   /* set loader*/
      //   $scope.loading = true;
      //
      //   /* Get all the Users, then bind it to the scope */
      //   Users.getAll().then(function(response) {
      //       $scope.loading = false; //remove loader
      //       // TODO is projects working?
      //       $scope.projects = response.data;
      //   }, function(error) {
      //       $scope.loading = false;
      //       $scope.error = 'Unable to retrieve listings!\n' + error;
      //   });
      // };
      $scope.create = function (isValid) {
          $scope.error = null;

          /*
           Check that the form is valid. (https://github.com/paulyoder/angular-bootstrap-show-errors)
           */
          if (!isValid) {
              $scope.$broadcast('show-errors-check-validity', 'projectForm');

              return false;
          }

          /* Create the listing object */
          var project = {
              title: $scope.title,
              details: $scope.details,
              category: null
              //    TODO does null work?
          };

          /* Save the project using the Projects factory  */
          Projects.create(project)
              .then(function (response) {
                  //if the object is successfully saved redirect back to the list page
                  $state.go('projects.category', {successMessage: 'Project succesfully created!'});
              }, function (error) {
                  //otherwise display the error
                  $scope.error = 'Unable to create project!\n' + error;
              });


      };
      $scope.category = function (isValid) {
          $scope.error = null;
          if (!isValid) {
              $scope.$broadcast('show-errors-check-validity', 'projectForm');

              return false;
          }
          Projects.category($scope.project.title, $scope.project)
              .then(function (response) {
                  $state.go('projects.team', {successMessage: 'Project category set'});
              }, function (error) {
                  $scope.error = 'Unable to add category\n' + error;
              });

      };

  }]);
