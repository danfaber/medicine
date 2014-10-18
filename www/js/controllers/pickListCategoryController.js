(function(){
    var app = angular.module("medicine");

    app.controller("pickListCategoryController", function($scope, $stateParams, recordDefinitions, $ionicNavBarDelegate, pickListService) {

        $scope.recordDefinitionId = parseInt($stateParams.recordDefinitionId);
        $scope.fieldDefinitionId = parseInt($stateParams.fieldDefinitionId);
        $scope.index = parseInt($stateParams.index);

        var pickListId =  recordDefinitions.getFieldDefinition($scope.recordDefinitionId, $scope.fieldDefinitionId).pickListId;

        $scope.pickList = pickListService.getById(pickListId);

        $scope.$on("backButtonClicked", function () {

            $ionicNavBarDelegate.back();
        });
    });

})();

