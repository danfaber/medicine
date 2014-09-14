(function(){

    angular.module("medicine")
        .directive("pickList", function(){
            return {
                restrict: "E",
                template: '<a href="#/app/pickList?recordDefinitionId=4&fieldDefinitionId=2&index=0"></a>',
                scope: {
                    value: "=",
                    recordField: "="
                }
            }
        });

})();

