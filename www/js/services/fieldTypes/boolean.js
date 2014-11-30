(function(){
    'use strict';

    angular.module("medicine").factory("booleanType", [booleanType]);

    function booleanType(){

        var name = "boolean";

        function defaultValue()
        {
            return false;
        }

        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();
