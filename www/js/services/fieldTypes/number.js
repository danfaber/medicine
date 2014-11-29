(function(){
    'use strict';

    angular.module("medicine").factory("numberType", [numberType]);

    function numberType(){

        var defaultValue = null;
        var name = "number";

        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();

