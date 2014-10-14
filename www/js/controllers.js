
var app = angular.module('medicine');

app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, currentRecordDataService) {

/*  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });*/

  // Triggered in the login modal to close it
/*  $scope.closeLogin = function() {
    $scope.modal.hide();
  },*/

  // Open the login modal
/*  $scope.login = function() {
    $scope.modal.show();
  };*/

  // Perform the login action when the user submits the login form
/*  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };*/


  $scope.backButtonClicked = function(){
      $rootScope.$broadcast("backButtonClicked",{});
  };

    document.addEventListener('pause', function() {
        window.localStorage.setItem("pause","paused at"+new Date());
        currentRecordDataService.persistCurrentRecords();
    });

/*    document.addEventListener('resume', function() {
        window.localStorage.setItem("resume","resumed at"+new Date());
        currentRecordDataService.hydrateCurrentRecords();
    });*/

});

/*.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  $scope.types = [
      {id:1, description: "Procedures"},
      {id:2, description: "Referals"},
      {id:3, description: "Clinics"}

  ];



})*/

/*
.controller('PlaylistCtrl', function($scope, $stateParams) {
          $scope.typeId = $stateParams.typeId;
})
*/
