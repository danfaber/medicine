(function(){

    angular.module("medicine")
        .directive("shortText", function(){
            return {
                restrict: "E",
                template: "<input type='text'>"
            }
        });

})();
