(function(){

    angular.module("medicine")
        .directive("longText", function(){
            return {
                restrict: "E",
                templateUrl: "templates/directives/longText.html"
            }
        });

})();
