(function(){
    'use strict';

    angular.module("medicine").factory("pickListRepository",['$window', pickListRepository]);

    function pickListRepository($window){
        var pickListPrefix = 'PickLists';
        var pickListsEverSavedKey = 'HavePickListsEverBeenSaved';
        var pickListAddedPrefix = 'PickListAdded_';

        return {
            saveAll: saveAll,
            havePicksListsEverBeenSaved: havePicksListsEverBeenSaved,
            getAllAsJson: getAllAsJson,
            saveAddedValue: saveAddedValue,
            getNewValues: getNewValues
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

        function saveAddedValue(pickListId, pickListValue)
        {
            var key = pickListAddedPrefix+pickListId.toString();

            var existingAddedValuesJson = $window.localStorage.getItem(key);

            var existingAddedValues = existingAddedValuesJson ? JSON.parse(existingAddedValuesJson) : [];

            existingAddedValues.push(pickListValue);

            var newValuesJson = angular.toJson(existingAddedValues);

            $window.localStorage.setItem(key, newValuesJson);
        }

        function getNewValues(pickListId)
        {
            var key = pickListAddedPrefix+pickListId.toString();
            var newValueJson = $window.localStorage.getItem(key);

            return newValueJson ? JSON.parse(newValueJson) : [];
        }
    }

})();

