(function(){

    angular.module("medicine").factory("pickListRepository",['$window','pickListEntity', pickListRepository]);

    function pickListRepository($window, pickListEntity){
        var pickListPrefix = 'PL';

        return {
            getSavedPickList: getSavedPickList
        };

        function getSavedPickList(id)
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
        }
    }

})();

