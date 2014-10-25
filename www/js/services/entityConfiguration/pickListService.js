(function(){
    'use strict';

    angular.module("medicine").factory("pickListService", ["pickListEntity", "pickListRepository", "utilitiesService", pickListService]);

    function pickListService(pickListEntity, pickListRepository, utilitiesService){

        var pickLists = [];
        var maximumWordMatches = 8;
        var maximumValueMatches = 25;
        
        function getDefaultPickLists()
        {
            return [
                new pickListEntity.PickList(1, 'Symptoms', false, true, true, [
                        new pickListEntity.CategoryValue(1, 'Heart', ['Upper Heart','Middle Heart', 'Lower Heart','Related Cardiac']),
                        new pickListEntity.CategoryValue(2, 'Lung', ['Left Lung', 'Right Lung', 'Top Lung'])
                    ]),

                new pickListEntity.PickList(2, 'Location', true, false, false, [
                        new pickListEntity.CategoryValue(3, 'All', ['London Town', 'Manchester Area', 'Liverpool', 'Loughborough Ville'])
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

        function getCategory(pickListId, categoryId)
        {
            var pickList = getById(pickListId);
            return _(pickList.categories)
                .find(function(category) {return category.id === categoryId;})
        }

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

        function valueMatches(pickListId, searchTerms, categoryId)
        {
            var pickList = getById(pickListId);
            var valueMatches = [];
            var value;
            var isNotInFilteredCategory;
            var requiredWordsLowered = lowerCaseArray(searchTerms.completeWords);
            var numberOfRequiredWords = requiredWordsLowered.length;
            var partialWord = searchTerms.partialWord ? searchTerms.partialWord.toLowerCase() : "";
            var partialWordLength = partialWord.length;

            for (var i = 0; i < pickList.values.length; i++)
            {
                value = pickList.values[i];

                isNotInFilteredCategory = categoryId && value.categoryId !== categoryId;

                if (isNotInFilteredCategory) { continue; }

                if (doesNotMatchRequiredWords(value, requiredWordsLowered, numberOfRequiredWords)) { continue; }

                if (doesNotMatchPartialWord(value, requiredWordsLowered, partialWord, partialWordLength)) { continue; }

                valueMatches.push(value);
                if (valueMatches.length >= maximumValueMatches) {break;}
            }

            return _(valueMatches).sortBy(function(val){return val.text;});
        }

        function doesNotMatchPartialWord(pickListValue, requiredWords, partialWord, partialWordLength)
        {
            if (!partialWord) { return false; }

            var word;
            for(var i = 0; i < pickListValue.words.length; i++)
            {
                word = pickListValue.words[i];
                if (requiredWords.indexOf(word) > -1) {continue;}

                if (word.substring(0, partialWordLength) === partialWord) {return false;}
            }
            return true;
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

        function incrementCount(pickListId, value)
        {
            value.count ++;

            var pickList = getById(pickListId);
            var currentIndex = pickList.values.indexOf(value);

            for (var i = currentIndex; i > 0; i--)
            {
                if (pickList.values[i-1].count >= value.count)
                {
                    break;
                }
            }

            if (i < currentIndex)
            {
                utilitiesService.moveItemsInArray(pickList.values,currentIndex, i);
            }
         }


        function findByText(pickListId, text, categoryId)
        {
            if (!text) {return null;}
            var loweredText = text.toLowerCase();

            var pickList = getById(pickListId);
            categoryId = tidy(categoryId);

            return _(pickList.values).find(function(val){
               return tidy(val.categoryId) == categoryId &&
                      val.text.toLowerCase() == loweredText;
            });
        }

        function tidy(value)
        {
            return !value ? 0 : value;
        }


        function addNewValue(pickListId, text, categoryId)
        {
            var existingValue = findByText(pickListId, text, categoryId);

            if (existingValue) {return existingValue;}

            var pickList = getById(pickListId);
            var newValue = new pickListEntity.PickValue(text, categoryId);
            pickList.values.push(newValue);
            return newValue;
        }

        return {
            loadPickLists: loadPickLists,
            persistPickLists: persistPickLists,
            getById: getById,
            getCategory: getCategory,
            wordMatches: wordMatches,
            valueMatches: valueMatches,
            incrementCount: incrementCount,
            addNewValue: addNewValue,
            findByText: findByText
        };
    }
})();