(function(){
    var app = angular.module("medicine");

    var controller = function($scope, $stateParams, $ionicScrollDelegate, autoCompleteTypesDataService, $timeout, typeDataService, currentRecordDataService, $state, $ionicNavBarDelegate) {

        var typeId = $stateParams.typeId;
        var fieldId = $stateParams.fieldId;
        var index = parseInt($stateParams.index);

        var field = typeDataService.getField(typeId,fieldId)

        var numberOfFavouritesToShow = 40;
        var favourites = [];

        $scope.data =  {searchText:""};

        buildFavourites();
        showFavourites();

        var wordsInCurrentFilteredList = autoCompleteTypesDataService.allWords(field.autoCompleteTypeId);

        $scope.changeSearchText = function()
        {
            var searchText = $scope.data.searchText;

            if (!searchText) {
                showFavourites();
                wordsInCurrentFilteredList = autoCompleteTypesDataService.allWords(field.autoCompleteTypeId);
                return;
            }

            searchText = searchText.toLowerCase();

            var lastSpaceIndex = searchText.lastIndexOf(" ");

            var isLastCharacterSpace = (lastSpaceIndex + 1 === searchText.length);

            if (isLastCharacterSpace)
            {
                showMatchingDiseases();
                return;
            }

            var isSingleWordSearch = lastSpaceIndex === -1;
            var wordSearch = (isSingleWordSearch) ? searchText : searchText.substring(lastSpaceIndex+1);

            $scope.data.wordMatches = wordSearchFromExistingMatches(wordSearch);

            $scope.data.searchResults = [];

            $ionicScrollDelegate.scrollTop();
        };

        $scope.selectWord = function(word)
        {
            var lastSpaceIndex = $scope.data.searchText.lastIndexOf(" ");

            var previousWords = (lastSpaceIndex === -1) ? "" : $scope.data.searchText.substring(0, lastSpaceIndex+1);

            $scope.data.searchText = previousWords + word + " ";

            $scope.data.wordMatches = [];

            showMatchingDiseases();

            $timeout(function(){document.getElementById("searchBox").focus();},0);
        };

        $scope.selectAutocomplete = function(searchResult) {

            currentRecordDataService.updateAutocompleteField(typeId, fieldId, index, searchResult);

            currentRecordDataService.getCurrentRecord(typeId).isDirty = true;

            $state.go('app.add', {typeId: typeId} );
        };
        
        $scope.goBack = function () {
            $ionicNavBarDelegate.back();
        };


        function buildFavourites()
        {
            var field = typeDataService.getField(typeId, fieldId);
            var history = field.history;

            var topHistory = history.slice(0,numberOfFavouritesToShow);

            favourites = topHistory.map(function(history) {
                return autoCompleteTypesDataService.getByKey(typeId, history.key);})
        }

        function showFavourites()
        {
            $scope.data.wordMatches = [];
            $scope.data.searchResults = favourites;
        }

        function showMatchingDiseases()
        {
            var searchText = $scope.data.searchText.toLowerCase();

            $scope.data.searchResults = autoCompleteTypesDataService.searchDisease(field.autoCompleteTypeId, searchText);
            $scope.data.wordMatches = [];

            wordsInCurrentFilteredList = _.chain($scope.data.searchResults)
                .map(function(result) {return result.words;})
                .flatten(true)
                .uniq()
                .value();
        }

        function wordSearchFromExistingMatches(wordSearch)
        {
            var searchLength = wordSearch.length;

            var matches = wordsInCurrentFilteredList
                .filter(function(word) {
                    return word.substring(0, searchLength) === wordSearch;})

            return matches;
        }
    };

    app.controller('autoCompleteController', controller);

})();
