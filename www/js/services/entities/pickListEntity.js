(function(){

    angular.module("medicine").factory("pickListEntity", ['pickValueSplitter', pickListEntity]);

    function pickListEntity(pickValueSplitter){

        function PickList(id, name, isAbleToAddNewValues, showCategoriesAsTabs, categories)
        {
            this.id = id;
            this.name = name;
            this.isAbleToAddNewValues = isAbleToAddNewValues;
            this.showCategoriesAsTabs = showCategoriesAsTabs;
            this.categories = categories;
        }


        function Category(id, name, values)
        {
            this.id = id;
            this.name = name;
            this.values = values;
            this.valueCount = values.length;
        }



/*        Category.prototype = function(){

            function addNewValue(text)
            {
                var newValue = new PickValue(text, 1);
                this.values.push(newValue);
                this.valueCount ++;
            }

            return {
                addNewValue: addNewValue
            };
        }();*/

        function PickValue(text)
        {
            this.text = text;
            this.count = 0;// (count === undefined) ? 1 : count;
            this.words = pickValueSplitter.splitSentence(text);
        }

/*        PickValue.prototype = function(){

            function increment()
            {
                this.count ++;
            }

            return {
                increment: increment
            };
        }();*/

        return {
            PickList: PickList,
            Category: Category,
            PickValue: PickValue
        };
    }
})();

