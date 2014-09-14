(function(){

    angular.module("medicine")
        .directive("longText", function(){
            return {
                restrict: "E",
                template: '<textarea ng-model="value.value"></textarea>',
                scope: {
                    value: "="
                }
            }
        });

})();
