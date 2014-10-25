(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("settingsController", function($scope, settingsDataService) {
        $scope.data = {};

        $scope.data.isBarcodeScannerEnabled = settingsDataService.getBarcodeScannerEnabled();

        $scope.changeBarcodeScanner = function()
        {
            settingsDataService.setBarcodeScannerEnabled($scope.data.isBarcodeScannerEnabled);
        }

    });

})();

