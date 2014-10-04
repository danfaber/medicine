(function(){

    angular.module("medicine")
        .directive("shortText", function(){
            return {
                restrict: "E",
                template: "<div class='item item-input'><input type='text'></div>"
            }
        });

})();
