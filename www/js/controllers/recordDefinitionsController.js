(function() {
    'use strict';

    angular.module("medicine")
        .controller("recordDefinitionsController", recordDefinitionsController);

    function recordDefinitionsController($scope, recordDefinitions)
    {
        $scope.recordDefinitions = recordDefinitions.all();
    }

})();

