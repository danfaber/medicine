(function(){

    angular.module("medicine")
        .directive("longText", function(){
            return {
                restrict: "E",
                template: "<div class='item item-input'><textarea rows='4' ng-model='value.value'></textarea></div>",
                scope :{
                    value: "="
                }
            }
        });

})();
