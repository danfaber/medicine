(function(){

    angular.module("medicine")
        .directive("date", function(){
            return {
                restrict: "E",
                template: "<div class='item'><input type='date'></div>"
            }
        });

})();

