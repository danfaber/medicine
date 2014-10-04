(function(){

    angular.module("medicine")
        .directive("boolean", function(){
            return {
                restrict: "E",
                template: "<input type='checkbox'>"
            }
        });

})();

