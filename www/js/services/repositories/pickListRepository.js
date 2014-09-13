(function(){

    angular.module("medicine").factory("pickListRepository",['$window', pickListRepository]);

    function pickListRepository($window){
        var pickListPrefix = 'PL';

        return {
            loadPickList:loadPickList

        };


        function loadPickList(id)
        {
            var pickListJson = $window.localStorage.getItem(pickListPrefix+id.toString());
            return (pickListJson) ? JSON.parse(pickListJson) : false;
        }




    }





})();

