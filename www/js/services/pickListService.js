(function(){

    angular.module("medicine").factory("pickListService", ['pickListRepository', pickListService]);

    function pickListService(pickListRepository){

        var defaultPickLists = [
            new PickList(1,'Symptoms',[
                new Tab(1, 'Heart', [
                    new TabValue('Upper Heart'),
                    new TabValue('Middle Heart'),
                    new TabValue('Lower Heart'),
                    new TabValue('Related Cardiac')
                ]),
                new Tab(2, 'Lung', [
                    new TabValue('Left Lung'),
                    new TabValue('Right Lung'),
                    new TabValue('Top Lung')
                ])
            ]),
            new PickList(2,'Location',[
                new Tab(2, 'All', [
                    new TabValue('London'),
                    new TabValue('Manchester'),
                    new TabValue('Liverpool'),
                    new TabValue('Loughborough')
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
            return (loadedPickList)
                ? loadedPickList
                : _(defaultPickLists).find(function(list) {return list.id === id;});
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

        function TabValue(text)
        {
            this.text = text;
            this.count = 0;
        }


        return {
            getPickList: getPickList
        };


    }

})();
