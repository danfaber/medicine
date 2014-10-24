(function(){
    'use strict';

    angular.module("medicine").factory("pickListService", ["pickListEntity", "pickListRepository", pickListService]);

    function pickListService(pickListEntity, pickListRepository){

        var pickLists = [];
        var maximumWordMatches = 8;
        var maximumValueMatches = 25;
        
        function getDefaultPickLists()
        {
            return [
                new pickListEntity.PickList(1, 'Symptoms', true, true, [
                        new pickListEntity.CategoryValue(1, 'Heart', ['Upper Heart','Middle Heart', 'Lower Heart','Related Cardiac']),
                        new pickListEntity.CategoryValue(2, 'Lung', ['Left Lung', 'Right Lung', 'Top Lung'])
                    ]),

                new pickListEntity.PickList(2, 'Location', false, false, [
                        new pickListEntity.CategoryValue(3, 'All', ['London', 'Manchester', 'Liverpool', 'Loughborough'])
                ])
            ];
        }


        function loadPickLists()
        {
            pickLists = pickListRepository.getAll();

            if (pickLists.length === 0)
            {
                pickLists = getDefaultPickLists();
            }
        }
        
        function persistPickLists()
        {
            pickListRepository.saveAll(pickLists);
        }
        
        function getById(pickListId)
        {
            return _(pickLists).find(function(list) {return list.id === pickListId;});
        }

/*        function getCategory(pickListId, categoryId)
        {
            var pickList = getById(pickListId);
            return _(pickList.categories)
                .find(function(category) {return category.id === categoryId;})
        }*/

        function wordMatches(pickListId, searchTerms, categoryId)
        {
            if (!searchTerms.partialWord) {return [];}

            var pickList = getById(pickListId);

            var searchText = searchTerms.partialWord.toLowerCase();

            var requiredWords = lowerCaseArray(searchTerms.completeWords);

            var value;
            var wordMatches = [];
            var numberOfRequiredWords = requiredWords.length;
            var searchTextLength;
            var searchTextMatches;
            var searchTextMatch;
            var isNotInFilteredCategory;

            for (var valueIndex = 0; valueIndex < pickList.values.length; valueIndex++)
            {
                value = pickList.values[valueIndex];

                isNotInFilteredCategory = categoryId && value.categoryId !== categoryId;

                if (isNotInFilteredCategory) { continue; }

                if (doesNotMatchRequiredWords(value, requiredWords, numberOfRequiredWords)) { continue; }

                searchTextLength = searchText.length;

                searchTextMatches = _(value.words).filter(function(word){

                   if (requiredWords.indexOf(word) > -1) {return false;}
                   return word.substring(0, searchTextLength) === searchText;
                });

                for (var i = 0; i < searchTextMatches.length; i++ )
                {
                    searchTextMatch = searchTextMatches[i];
                    if (wordMatches.indexOf(searchTextMatch) === -1)
                    {
                        wordMatches.push(searchTextMatch);
                    }
                }

                if (wordMatches.length >= maximumWordMatches) {break;}
            }
            return wordMatches;
        }


        function valueMatches(pickListId, requiredWords, categoryId)
        {
            if (requiredWords.length === 0) {return [];}

            var pickList = getById(pickListId);

            var valueMatches = [];
            var value;
            var isNotInFilteredCategory;
            var requiredWordsLowered = lowerCaseArray(requiredWords);
            var numberOfRequiredWords = requiredWordsLowered.length;

            for (var i = 0; i < pickList.values.length; i++)
            {
                value = pickList.values[i];

                isNotInFilteredCategory = categoryId && value.categoryId !== categoryId;

                if (isNotInFilteredCategory) { continue; }

                if (doesNotMatchRequiredWords(value, requiredWordsLowered, numberOfRequiredWords)) { continue; }

                valueMatches.push(value);
                if (valueMatches.length >= maximumValueMatches) {break;}
            }

            return valueMatches;
        }

        function lowerCaseArray(items)
        {
            return _(items).map(function(item) {return item.toLowerCase();});
        }


        function doesNotMatchRequiredWords(value, requiredWords, numberOfWords)
        {
            var requiredWord;
            for (var i = 0; i < numberOfWords; i++)
            {
                requiredWord = requiredWords[i];
                if (value.words.indexOf(requiredWord) === -1)
                {
                    return true;
                }
            }
            return false;
        }


        return {
            loadPickLists: loadPickLists,
            persistPickLists: persistPickLists,
            getById: getById,
        /*    getCategory: getCategory,*/
          //  getWordMatches: getWordMatches,
            wordMatches: wordMatches,
            valueMatches: valueMatches
        };
    }
})();