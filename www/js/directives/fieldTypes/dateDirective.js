(function(){

    angular.module("medicine")
        .directive("date", [function(){
            return {
                restrict: "E",
                template: "{{dirty}} <div class='item item-input'><input type='date' ng-model='value.value' ng-change='makeDirty()'></div>",
                scope :{
                    value: "=",
                    dirty: "="
                },
                controller: function($scope)
                {
                    $scope.makeDirty = function()
                    {
                        $scope.dirty= true;
                    }


                }
            }
        }]);

})();

