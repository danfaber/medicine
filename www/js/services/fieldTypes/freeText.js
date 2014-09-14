(function(){

    angular.module("medicine").factory("freeTextType", [freeTextType]);

    function freeTextType(fieldType){

        var defaultValue = null;
        var name = "freeText";


        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();