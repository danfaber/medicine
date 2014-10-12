(function(){

    angular.module("medicine").factory("date_Type", ["$filter", date_Type]);

    function date_Type($filter){

        function defaultValue ()
        {
            return $filter('date')(new Date(),'yyyy-MM-dd');
        }

        var name = "date";


        return {
            defaultValue: defaultValue,
            name: name
        };
    }
})();
