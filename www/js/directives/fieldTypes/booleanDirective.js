(function(){

    angular.module("medicine")
        .directive("boolean", function(){
            return {
                restrict: "E",
                template: '<label class="checkbox"><input type="checkbox" style="padding: 0 0 1px 0;"></label>',
                scope: {
                    recordField: "="
                }
            }
        });

})();

