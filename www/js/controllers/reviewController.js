(function() {

    var app = angular.module("medicine");

    app.controller("reviewController", function($scope, $stateParams, currentRecordDataService, dataType, optionGroupDataService, $state, $ionicLoading, $ionicPopup, $ionicNavBarDelegate, historyDataService) {

        $scope.data = {};

        $scope.data.currentRecord = historyDataService.getDisplayHistory($stateParams.recordId)


    });

})();

