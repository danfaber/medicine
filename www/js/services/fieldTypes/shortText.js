(function(){
    'use strict';

    angular.module("medicine").factory("shortTextType", [shortTextType]);

    function shortTextType(){

        var defaultValue = null;
        var name = "shortText";


        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();