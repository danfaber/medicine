(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("settingsController", function($scope, pickListService, settingsRepository) {
        $scope.data = {};

        $scope.data.isBarcodeScannerEnabled = settingsRepository.getBarcodeScannerEnabled();
        $scope.data.userName = settingsRepository.getUserName();

        $scope.saveUserName = function()
        {
            settingsRepository.setUserName($scope.data.userName);
        };

        $scope.changeBarcodeScanner = function()
        {
            settingsRepository.setBarcodeScannerEnabled($scope.data.isBarcodeScannerEnabled);
        };

/*        $scope.simulateStop = function()
        {
            pickListService.persistPickLists();
        };*/

        $scope.clearStorage = function()
        {
          window.localStorage.clear();
        };

    });

})();

