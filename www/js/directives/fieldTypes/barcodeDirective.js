(function(){

    angular.module("medicine")
        .directive("barcode", function(){
            return {
                restrict: "E",
                template: "<div class='item item-input item-icon-right'><input ng-model='value.value' type='text'><i class='icon ion-ios7-barcode'></i></div>",
                scope :{
                    value: "="
                }
            }
        });

})();
