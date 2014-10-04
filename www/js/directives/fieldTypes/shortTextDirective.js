(function(){

    angular.module("medicine")
        .directive("shortText", function(){
            return {
                restrict: "E",
                templateUrl: "templates/directives/shortText.html"
            }
        });

})();
