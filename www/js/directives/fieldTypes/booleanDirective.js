(function(){

    angular.module("medicine")
        .directive("boolean", function(){
            return {
                restrict: "E",
                templateUrl: "templates/directives/boolean.html"
            }
        });

})();

