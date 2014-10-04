(function(){

    angular.module("medicine")
        .directive("longText", function(){
            return {
                restrict: "E",
                template: "<textarea></textarea>"
            }
        });

})();
