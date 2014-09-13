(function(){

    angular.module("medicine").factory("pickListRepository",['$window','pickListEntityService', pickListRepository]);

    function pickListRepository($window, pickListEntityService){
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

            return new pickListEntityService.PickList(pickListData.id, pickListData.name, tabs);
        }

        function regenerateTab(tabData)
        {
            var values = _(tabData).values
                .map(function(value) {return regenerateTabValue(value);});

            return new pickListEntityService.Tab(tabData.id, tabData.name, values);
        }

        function regenerateTabValue(tabValueData)
        {
            return new pickListEntityService.TabValue(tabValueData.text, tabValueData.count);
        }
    }

})();

