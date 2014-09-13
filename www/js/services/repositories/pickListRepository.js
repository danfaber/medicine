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
            var tabs = _(pickListData.tabs)
                .map(function(tab) {return regenerateTab(tab) ;});

            return new pickListEntity.PickList(pickListData.id, pickListData.name, tabs);
        }

        function regenerateTab(tabData)
        {
            var values = _(tabData).values
                .map(function(value) {return regenerateTabValue(value);});

            return new pickListEntity.Tab(tabData.id, tabData.name, values);
        }

        function regenerateTabValue(tabValueData)
        {
            return new pickListEntity.TabValue(tabValueData.text, tabValueData.count);
        }
    }

})();

