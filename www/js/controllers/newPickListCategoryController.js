(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("newPickListCategoryController", function($scope, $stateParams, recordDefinitions, $ionicNavBarDelegate, pickListService, currentRecordService, $state) {

        var fieldDefinitionId = parseInt($stateParams.fieldDefinitionId);
        var recordDefinitionId = parseInt($stateParams.recordDefinitionId);
        var index = parseInt($stateParams.index);
        var pickListId = parseInt($stateParams.pickListId);
        var text = $stateParams.text;

        $scope.pickList = pickListService.getById(pickListId);

        $scope.selectCategory = function(category)
        {
            var newValue = pickListService.addNewValue(pickListId, text, category.id);

            pickListService.selectValue(recordDefinitionId, fieldDefinitionId, pickListId, index, newValue);

            $state.go('app.add', {recordDefinitionId: recordDefinitionId} );
        };

    });

})();


