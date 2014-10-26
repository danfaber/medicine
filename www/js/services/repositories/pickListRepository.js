(function(){
    'use strict';

    angular.module("medicine").factory("pickListRepository",['$window', pickListRepository]);

    function pickListRepository($window){
        var pickListPrefix = 'PickLists';
        var pickListsEverSavedKey = 'HavePickListsEverBeenSaved';

        return {
         /*   getSavedPickList: getSavedPickList*/
    /*        getAll: getAll,*/
            saveAll: saveAll,
            havePicksListsEverBeenSaved: havePicksListsEverBeenSaved,
            getAllAsJson: getAllAsJson
        };


/*        function getAll()
        {
            var pickListJson = $window.localStorage.getItem(pickListPrefix);

            if (!pickListJson) {return [];}

            return JSON.parse(pickListJson);
        }*/

        function getAllAsJson()
        {
            return $window.localStorage.getItem(pickListPrefix);
        }

        function havePicksListsEverBeenSaved () {
            return !!$window.localStorage.getItem(pickListsEverSavedKey);
        }

        function saveAll(pickListJson)
        {
            $window.localStorage.setItem(pickListPrefix, pickListJson);
            $window.localStorage.setItem(pickListsEverSavedKey,'true');
        }


    }

})();

