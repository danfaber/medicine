(function(){
    'use strict';

    angular.module("medicine").factory("pickListService", ["pickListEntity", "pickListRepository", pickListService]);

    function pickListService(pickListEntity, pickListRepository){

        var pickLists = [];
        var maximumWordMatches = 10;
        
        function getDefaultPickLists()
        {
            return [
                addPickList(1,'Symptoms',true, true,[
                    withCategory(1, 'Heart', ['Upper Heart','Middle Heart', 'Lower Heart','Related Cardiac']),
                    withCategory(2, 'Lung', ['Left Lung', 'Right Lung', 'Top Lung'])]),

                addPickList(2, 'Location', [
                    withCategory(3, 'All', ['London', 'Manchester', 'Liverpool', 'Loughborough'])
                ])
            ];
        }

        function addPickList(id, name, isAbleToAddNewValues, showCategoriesAsTabs, categories)
        {
            return new pickListEntity.PickList(id, name, isAbleToAddNewValues, showCategoriesAsTabs, categories);
        }

        function withCategory(id, name, values)
        {
            var pickValues = _(values).map(function(value) {return new pickListEntity.PickValue(value, 0); });
            return new pickListEntity.Category(id, name, pickValues);
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

        function getWordMatches(category, searchText)
        {
            if (!searchText) {return [];}

            searchText = searchText.toLowerCase();
            var searchTextLength = searchText.length;

            var wordMatches = [];
            var numberOfMatches = 0;
            var currentWord;

            for (var i = 0; i < category.allWords.length; i++)
            {
                currentWord = category.allWords[i];

                if (currentWord.substring(0, searchTextLength) === searchText)
                {
                    numberOfMatches++;
                    wordMatches.push(currentWord);

                    if (numberOfMatches>=maximumWordMatches) {break;}
                }
            }
            return wordMatches;
        }


        function wordMatches(category, requiredWords, searchText)
        {
            if (!searchText) {return [];}

            searchText = searchText.toLowerCase();

            var requiredWordsLowered = _(requiredWords)
                .map(function(word) {return word.toLowerCase();});

            var isAllRequiredWordsMatching;
            var value;
            var isRequiredWordNotMatched;
            var requiredWord;
            var wordMatches = [];
            var numberOfRequiredWords = requiredWordsLowered.length;
            var searchTextLength;
            var searchTextMatches;
            var searchTextMatch;

            for (var valueIndex = 0; valueIndex < category.values.length; valueIndex++)
            {
                value = category.values[valueIndex];
                isAllRequiredWordsMatching = true;
                for (var requiredWordIndex = 0; requiredWordIndex < numberOfRequiredWords; requiredWordIndex++)
                {
                    requiredWord = requiredWordsLowered[requiredWordIndex];
                    isRequiredWordNotMatched = value.words.indexOf(requiredWord) === -1;

                    if (isRequiredWordNotMatched)
                    {
                        isAllRequiredWordsMatching = false;
                        break;
                    }
                }

                if (!isAllRequiredWordsMatching) {continue;}

                searchTextLength = searchText.length;

                searchTextMatches = _(value.words).filter(function(word){

                   if (requiredWordsLowered.indexOf(word) > -1) {return false;}
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


        return {
            loadPickLists: loadPickLists,
            persistPickLists: persistPickLists,
            getById: getById,
            getCategory: getCategory,
            getWordMatches: getWordMatches,
            wordMatches: wordMatches
        };
    }
})();