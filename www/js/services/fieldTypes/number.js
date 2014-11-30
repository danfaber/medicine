(function(){
    'use strict';

    angular.module("medicine").factory("numberType", [numberType]);

    function numberType(){

        function defaultValue() {
            return null;
        }

        var name = "number";

        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();

