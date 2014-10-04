(function(){

    angular.module("medicine").factory("date_Type", [date_Type]);

    function date_Type(){

        var defaultValue = new Date();
        var name = "date";


        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();
