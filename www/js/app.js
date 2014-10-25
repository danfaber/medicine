var medicineApp = {};
medicineApp


// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('medicine', ['ionic','ngCordova'])

    .run(function ($ionicPlatform, pickListService) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            window.localStorage.clear();

/*            window.localStorage.setItem("deviceready","ready at"+new Date());
            currentRecordDataService.hydrateCurrentRecords();*/


            pickListService.loadPickLists();


/*            document.addEventListener('deviceready', function() {
                window.localStorage.setItem("deviceready","ready at"+new Date());
                currentRecordDataService.hydrateCurrentRecords();
            });*/

        });
    })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.history', {
      url: "/history",
      views: {
        'menuContent' :{
          templateUrl: "templates/history.html",
          controller: "historyController"
        }
      }
    })

    .state('app.export', {
      url: "/export",
      views: {
        'menuContent' :{
          templateUrl: "templates/export.html",
          controller: "exportController"
        }
      }
    })

      .state('app.autocomplete', {
          url: "/autocomplete?typeId&fieldId&index",
          views: {
              'menuContent' :{
                  templateUrl: "templates/autoComplete.html",
                  controller: "autoCompleteController"
              }
          }
      })

      .state('app.pickList', {
          url: "/pickList?recordDefinitionId&fieldDefinitionId&index&categoryId",
          views: {
              'menuContent' :{
                  templateUrl: "templates/pickList.html",
                  controller: "pickListController"
              }
          }
      })

      .state('app.pickListCategory', {
          url: "/pickListCategory?recordDefinitionId&fieldDefinitionId&index",
          views: {
              'menuContent' :{
                  templateUrl: "templates/pickListCategory.html",
                  controller: "pickListCategoryController"
              }
          }
      })



    .state('app.recordDefinitions', {
      url: "/recordDefinitions",
      views: {
        'menuContent' :{
          templateUrl: "templates/recordDefinitions.html",
          controller: 'recordDefinitionsController'
        }
      }
    })

    .state('app.add', {
      url: "/add?recordDefinitionId&recordId",
      views: {
        'menuContent' :{
          templateUrl: "templates/add.html",
          controller: 'addController'
        }
      }
    })

      .state('app.settings', {
          url: "/settings",
          views: {
              'menuContent' :{
                  templateUrl: "templates/settings.html",
                  controller: "settingsController"
              }
          }
      })

      .state('app.review', {
          url: "/review?typeId&recordId",
          views: {
              'menuContent': {
                  templateUrl: "templates/review.html",
                  controller: 'reviewController'
              }
          }
      });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/recordDefinitions');
});

