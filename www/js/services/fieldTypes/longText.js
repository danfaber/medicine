(function(){

    angular.module("medicine").factory("longTextType", [longTextType]);

    function longTextType(){

        var defaultValue = null;
        var name = "longText";

        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();
