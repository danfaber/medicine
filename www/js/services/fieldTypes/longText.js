(function(){
    'use strict';

    angular.module("medicine").factory("longTextType", [longTextType]);

    function longTextType(){

        function defaultValue()
        {
            return null;
        }
        var name = "longText";

        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();
