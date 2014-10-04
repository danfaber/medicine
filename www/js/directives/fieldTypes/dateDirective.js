(function(){

    angular.module("medicine")
        .directive("date", function(){
            return {
                restrict: "E",
                templateUrl: "templates/directives/date.html"
            }
        });

})();

