(function() {

    var app = angular.module("medicine");

    app.controller("typeController", function($scope, typeDataService) {

        $scope.types = typeDataService.getAllSorted();

    });


})();
