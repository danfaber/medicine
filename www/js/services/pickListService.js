(function(){

    angular.module("medicine").factory("pickListService", ['pickListRepository', pickListService]);

    function pickListService(pickListRepository){

        var defaultPickLists = [
            new PickList(1,'Symptoms',[
                new Tab(1, 'Heart', [
                    new TabValue('Upper Heart', 0),
                    new TabValue('Middle Heart', 0),
                    new TabValue('Lower Heart', 0),
                    new TabValue('Related Cardiac', 0)
                ]),
                new Tab(2, 'Lung', [
                    new TabValue('Left Lung', 0),
                    new TabValue('Right Lung', 0),
                    new TabValue('Top Lung', 0)
                ])
            ]),
            new PickList(2,'Location',[
                new Tab(2, 'All', [
                    new TabValue('London', 0),
                    new TabValue('Manchester', 0),
                    new TabValue('Liverpool', 0),
                    new TabValue('Loughborough', 0)
                ])
            ])
        ];

        var pickLists = [];

        function getPickList(id)
        {
            var pickList = _(pickLists).find(function(list) {return list.id == id;});

            if (pickList) {return pickList;}

            var loadedPickList = loadPickList(id);
            pickLists.push(loadedPickList);
            return loadedPickList;
        }


        function loadPickList(id)
        {
            var loadedPickList = pickListRepository.loadPickList(id);

            var isPickListNeverYetPersisted = !loadedPickList;

            if (isPickListNeverYetPersisted)
            {
                return _(defaultPickLists).find(function(list) {return list.id === id;});
            }

            var tabs = _(loadedPickList.tabs)
                .map(function(tab) {return regenerateTab(tab); });

            return new PickList(loadedPickList.id, loadedPickList.name, tabs);
        }


        function regenerateTab(jsonTab)
        {
            var values = _(jsonTab).values
                .map(function(value) {return new TabValue(value.text, value.count);})

            return new Tab(jsonTab.id, jsonTab.name, values);
        }

        function regenerateTabValue(jsonTabValue)
        {
            return new TabValue(jsonTabValue.text, jsonTabValue.count);
        }


        function PickList(id, name, tabs)
        {
            this.id = id;
            this.name = name;
            this.tabs = tabs;
        }


        function Tab(id, name, values)
        {
            this.id = id;
            this.name = name;
            this.values = values;
        }

        Tab.prototype = function(){

            function addNewValue(text)
            {
                var newValue = new TabValue(text, 1);
                this.values.push(newValue);
            }

            return {
                addNewValue: addNewValue
            };
        }();

        function TabValue(text, count)
        {
            this.text = text;

            this.count = (count === undefined) ? 1 : count;
        }

        TabValue.prototype = function(){

            function increment()
            {
                this.count ++;
            }

            return {
                increment: increment
            };
        }();


        return {
            getPickList: getPickList
        };


    }

})();
