(function() {

    angular.module("medicine")
        .controller("recordDefinitionsController", recordDefinitionsController);

    function recordDefinitionsController($scope, recordDefinitions)
    {
//        $scope.recordDefinitions = recordDefinitions.all;
        $scope.message = "hi";
    }


})();

