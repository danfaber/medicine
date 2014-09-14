(function(){

    angular.module("medicine").factory("booleanType", [booleanType]);

    function booleanType(){

        var defaultValue = false;
        var name = "boolean";

        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();
