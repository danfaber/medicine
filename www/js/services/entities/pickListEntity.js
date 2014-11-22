(function(){
    'use strict';

    angular.module("medicine").factory("pickListEntity", ['pickValueSplitter', pickListEntity]);

    function pickListEntity(pickValueSplitter){

        function PickList(id, name, isAbleToAddNewValues, promptBeforeAdd, showCategoriesAsTabs, isWordSearchFirst, categories, values)
        {
            var that = this;

            that.id = id;
            that.name = name;
            that.isAbleToAddNewValues = isAbleToAddNewValues;
            that.promptBeforeAdd = promptBeforeAdd;
            that.showCategoriesAsTabs = showCategoriesAsTabs;
            that.isWordSearchFirst = isWordSearchFirst;

            that.categories = categories;
            that.values = values;

/*            that.categories = [];
            that.values = [];

            _(categoryValues).each(function(categoryValue){

                that.categories.push(new Category(categoryValue.id, categoryValue.name));

                _(categoryValue.values).each(function(val){

                    that.values.push(new PickValue(val, categoryValue.id));
                });

            });*/
        }

        function CategoryValue(id, name, textValues)
        {
            this.id = id;
            this.name = name;
            this.values = textValues;
        }


        function Category(id, name)
        {
            this.id = id;
            this.name = name;
        }

        function PickValue(categoryId, text, words)
        {
            this.text = text;
            this.categoryId = categoryId;
            this.count = 0;
           // this.words = pickValueSplitter.splitSentence(text);
            this.words = words;
        }

        return {
            PickList: PickList,
            PickValue: PickValue,
            CategoryValue: CategoryValue,
            Category: Category
        };
    }
})();

