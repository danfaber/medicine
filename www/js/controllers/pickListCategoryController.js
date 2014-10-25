(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("pickListCategoryController", function($scope, $stateParams, recordDefinitions, $ionicNavBarDelegate, pickListService, currentRecordService, $state) {

        $scope.recordDefinitionId = parseInt($stateParams.recordDefinitionId);
        $scope.fieldDefinitionId = parseInt($stateParams.fieldDefinitionId);
        $scope.index = parseInt($stateParams.index);

        var pickListId =  recordDefinitions.getFieldDefinition($scope.recordDefinitionId, $scope.fieldDefinitionId).pickListId;

        $scope.pickList = pickListService.getById(pickListId);

/*        var currentValue = currentRecordService.getFieldValue($scope.recordDefinitionId, $scope.fieldDefinitionId, $scope.index);

        $scope.isValueAlreadySet = !!currentValue.value;

        $scope.removeValue = function()
        {
            currentValue.value = null;
            $state.go('app.add', {recordDefinitionId: $scope.recordDefinitionId} );
        };*/

        $scope.$on("backButtonClicked", function () {

            $ionicNavBarDelegate.back();
        });
    });

})();

