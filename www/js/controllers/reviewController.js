(function() {
    'use strict';

    var app = angular.module("medicine");

    app.controller("reviewController", function($scope, $stateParams, currentRecordDataService, dataType, optionGroupDataService, $state, $ionicLoading, $ionicPopup, $ionicNavBarDelegate, historyDataService) {

        $scope.data = {};

        $scope.data.currentRecord = historyDataService.getDisplayHistory($stateParams.recordId, false)

        $scope.$on("backButtonClicked", function () {
            $ionicNavBarDelegate.back();
        });

        $scope.deleteRecord = function()
        {

            var confirmBackPopup = $ionicPopup.confirm({
                title: 'Delete Record',
                template: 'Are you sure you want to permanently delete this record?  It cannot be undone!'
            });

            confirmBackPopup.then(function (result) {
                if (result) {
                    historyDataService.deleteRecord($stateParams.recordId);
                    $state.go('app.types');
                }
            })
        }


    });

})();

