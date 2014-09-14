(function(){

    angular.module("medicine")
        .directive("freeText", function(){
            return {
                restrict: "E",
                templateUrl: "templates/directives/fieldTypes/freeText.html",
                scope: {
                    recordField: "="
                }
            }
        });

})();
