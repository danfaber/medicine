(function(){
    'use strict';

    angular.module("medicine").factory("pickListType", [pickListType]);

    function pickListType(){

        var defaultValue = null;
        var name = "pickList";

        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();
