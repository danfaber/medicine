(function(){
    var app = angular.module("medicine");

    app.controller("pickListCategoryController", function($scope, $stateParams, recordDefinitions, $ionicNavBarDelegate) {

        var recordDefinitionId = parseInt($stateParams.recordDefinitionId);
        var fieldDefinitionId = parseInt($stateParams.fieldDefinitionId);

        $scope.pickList = recordDefinitions.getFieldDefinition(recordDefinitionId, fieldDefinitionId).pickList;


        $scope.$on("backButtonClicked", function () {

            $ionicNavBarDelegate.back();
        });

    });

})();

