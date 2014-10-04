(function(){

    angular.module("medicine")
        .directive("longText", function(){
            return {
                restrict: "E",
                template: "<div class='item'><textarea></textarea></div>"
            }
        });

})();
