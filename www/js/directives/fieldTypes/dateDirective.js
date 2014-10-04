(function(){

    angular.module("medicine")
        .directive("date", function(){
            return {
                restrict: "E",
                template: "<div class='item item-input'><input type='date'></div>"
            }
        });

})();

