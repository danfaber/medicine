(function(){

    angular.module("medicine")
        .directive("shortText", function(){
            return {
                restrict: "E",
                template: "<div class='item'><input type='text'></div>"
            }
        });

})();
