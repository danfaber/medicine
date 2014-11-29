(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("termsAndConditionsController", function($scope, $state, settingsRepository) {

        $scope.acceptConditions = function()
        {
            settingsRepository.acceptTermsAndConditions();
            $scope.globalData.isSideMenuEnabled = true;
            $state.go('app.recordDefinitions');
        }

    });

})();


