(function(){
    'use strict';

    angular.module("medicine").factory("pickListRepository",['$window', pickListRepository]);

    function pickListRepository($window){
        var pickListPrefix = 'PickLists';


        return {
         /*   getSavedPickList: getSavedPickList*/
            getAll: getAll,
            saveAll: saveAll
        };

/*        function getSavedPickList(id)
        {
            var pickListJson = $window.localStorage.getItem(pickListPrefix+id.toString());

            if (!pickListJson) {return false;}

            var pickListData = JSON.parse(pickListJson);

            return regeneratePickList(pickListData);
        }

        function regeneratePickList(pickListData)
        {
            var categories = _(pickListData.categories)
                .map(function(category) {return regenerateCategory(category) ;});

            return new pickListEntity.PickList(pickListData.id, pickListData.name, pickListData.isAbleToAddNewValues, pickListData.showCategoriesAsTabs, categories);
        }

        function regenerateCategory(categoryData)
        {
            var values = _(categoryData).values
                .map(function(value) {return regeneratePickValue(value);});

            return new pickListEntity.Category(categoryData.id, categoryData.name, values);
        }

        function regeneratePickValue(tabValueData)
        {
            return new pickListEntity.PickValue(tabValueData.text, tabValueData.count);
        }*/


        function getAll()
        {
            var pickListJson = $window.localStorage.getItem(pickListPrefix);

            if (!pickListJson) {return [];}

            return JSON.parse(pickListJson);
        }

        function saveAll(pickLists)
        {
            var pickListJson = angular.toJson(pickLists);
            $window.localStorage.setItem(pickListPrefix, pickListJson);
        }


    }

})();

