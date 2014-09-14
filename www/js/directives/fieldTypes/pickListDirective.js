(function(){

    angular.module("medicine")
        .directive("pickList", function(){
            return {
                restrict: "E",
                template: '<a href="#/app/pickList?recordDefinitionId={{recordDefinitionId}}&fieldDefinitionId={{fieldDefinitionId}}&index={{index}}">link text</a>',
                scope: {
                    value: "=",
                    recordDefinitionId: "@",
                    fieldDefinitionId: "@",
                    index: "@"
                }
            }
        });

})();

