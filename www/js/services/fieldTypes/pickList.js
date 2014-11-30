(function(){
    'use strict';

    angular.module("medicine").factory("pickListType", [pickListType]);

    function pickListType(){

        function defaultValue()
        {
            return null;
        }
        var name = "pickList";

        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();
