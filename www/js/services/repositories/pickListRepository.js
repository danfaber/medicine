(function(){
    'use strict';

    angular.module("medicine").factory("pickListRepository",['$window', 'utilitiesService', pickListRepository]);

    function pickListRepository($window, utilitiesService){
        var pickListPrefix = 'PickLists';
        var pickListsEverSavedKey = 'HavePickListsEverBeenSaved';
        var pickListAddedPrefix = 'PickListAdded_';
        var pickListDeletePrefix = 'PickListDeleted_';
        var pickListRecentPrefix = 'PickListRecent_';
        var numberOfMostRecents = 50;

        return {
            saveAll: saveAll,
            havePicksListsEverBeenSaved: havePicksListsEverBeenSaved,
            getAllAsJson: getAllAsJson,
            saveAddedValue: saveAddedValue,
            getNewValues: getNewValues,
            removeValue: removeValue,
            getDeletedValues: getDeletedValues,
            setRecentPickListValue: setRecentPickListValue,
            getMostRecentValues: getMostRecentValues
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

        function removeValue(pickListId, pickListValue)
        {
            var key = pickListDeletePrefix + pickListId;

            var existingDeletedValuesJson = $window.localStorage.getItem(key);

            var existingDeletedValues = existingDeletedValuesJson ? JSON.parse(existingDeletedValuesJson) : [];

            existingDeletedValues.push(pickListValue);

            var newDeletedValuesJson = angular.toJson(existingDeletedValues);

            $window.localStorage.setItem(key, newDeletedValuesJson);
        }

        function getDeletedValues(pickListId)
        {
            var key = pickListDeletePrefix + pickListId;
            var deletedValuesJson = $window.localStorage.getItem(key);
            return deletedValuesJson ? JSON.parse(deletedValuesJson) : [];
        }

        function setRecentPickListValue(pickListId, pickListValue)
        {
            var key = pickListRecentPrefix +  pickListId;
            var existingDeletedValuesJson = $window.localStorage.getItem(key);
            var existingDeletedValues = existingDeletedValuesJson ? JSON.parse(existingDeletedValuesJson) : [];

            var isAlreadyThere = _(existingDeletedValues)
                .some(function(val) {return val.categoryId === pickListValue.categoryId && val.text === pickListValue.text;});

            if (isAlreadyThere)
            {
                utilitiesService.removeFromArray(existingDeletedValues, function(val) {
                    return val.categoryId === pickListValue.categoryId && val.text === pickListValue.text;
                })
            }
            else
            {
                if (existingDeletedValues.length >= numberOfMostRecents)
                {
                    existingDeletedValues.splice(0,1);
                }
            }

            existingDeletedValues.push(pickListValue);

            $window.localStorage.setItem(key, angular.toJson(existingDeletedValues));
        }

        function getMostRecentValues(pickListId)
        {
            var key = pickListRecentPrefix +  pickListId;
            var existingDeletedValuesJson = $window.localStorage.getItem(key);
            var mostRecentValues = existingDeletedValuesJson ? JSON.parse(existingDeletedValuesJson) : [];
            return _(mostRecentValues).sortBy(function(val){return val.text;})
        }
    }

})();

