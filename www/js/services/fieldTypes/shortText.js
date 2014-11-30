(function(){
    'use strict';

    angular.module("medicine").factory("shortTextType", [shortTextType]);

    function shortTextType(){

        function defaultValue()
        {
            return null;
        }
        var name = "shortText";

        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();