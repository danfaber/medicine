(function(){
    'use strict';

    angular.module("medicine").factory("pickListRepository",['$window', pickListRepository]);

    function pickListRepository($window){
        var pickListPrefix = 'PickLists';
        var pickListsEverSavedKey = 'HavePickListsEverBeenSaved';

        return {
            saveAll: saveAll,
            havePicksListsEverBeenSaved: havePicksListsEverBeenSaved,
            getAllAsJson: getAllAsJson
        };

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

