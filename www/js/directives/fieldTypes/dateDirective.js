(function(){

    angular.module("medicine")
        .directive("date", function(){
            return {
                restrict: "E",
                template: "<div class='item item-input'><input type='date' ng-model='value.value'></div>",
                scope :{
                    value: "="
                }
            }
        });

})();

