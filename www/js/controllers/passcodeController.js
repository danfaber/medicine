(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("passCodeController", function($scope, settingsRepository) {
        $scope.globalData.isSideMenuEnabled = false;

        $scope.data = {
            numbers: [null, null, null, null]
        };

        $scope.numberClass = function(index)
        {
            var isEntered = $scope.data.numbers[index] !== null;

            return isEntered ? "icon ion-record balanced" : "icon ion-ios7-circle-outline";
        }

    });

})();

