(function(){

    angular.module("medicine").factory("pickListEntity", [pickListEntity]);

    function pickListEntity(){

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
            PickList: PickList,
            Tab: Tab,
            TabValue: TabValue
        };
    }
})();

