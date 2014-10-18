(function(){
    var app = angular.module("medicine");

    app.controller("pickListController", function($scope, $stateParams, pickListService, recordDefinitions,  $ionicNavBarDelegate) {

        var recordDefinitionId = parseInt($stateParams.recordDefinitionId);
        var fieldDefinitionId = parseInt($stateParams.fieldDefinitionId);
        var categoryId = parseInt($stateParams.categoryId);
        var index = parseInt($stateParams.index);
        $scope.data = {};

        var pickListId = recordDefinitions.getFieldDefinition(recordDefinitionId, fieldDefinitionId).pickListId;

        $scope.pickList = pickListService.getById(pickListId);

        $scope.category = pickListService.getCategory(pickListId, categoryId);

        $scope.inputTextChanged = function()
        {
            $scope.data.wordMatches = pickListService.getWordMatches($scope.category, $scope.data.inputText);
        };


        $scope.$on("backButtonClicked", function () {

            $ionicNavBarDelegate.back();
        });

    });

})();

