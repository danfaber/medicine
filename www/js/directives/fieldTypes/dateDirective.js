(function(){

    angular.module("medicine")
        .directive("date", function(){
            return {
                restrict: "E",
                template: "<input type='date'>"
            }
        });

})();

