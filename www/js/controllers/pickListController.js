(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("pickListController", function($scope, $stateParams, pickListService, recordDefinitions,  $ionicNavBarDelegate, $timeout) {

        var recordDefinitionId = parseInt($stateParams.recordDefinitionId);
        var fieldDefinitionId = parseInt($stateParams.fieldDefinitionId);
        var categoryId = parseInt($stateParams.categoryId);
        var index = parseInt($stateParams.index);

        $scope.data = {
            inputText: "",
            wordMatches: [],
            valueMatches: []
        };

        var pickListId = recordDefinitions.getFieldDefinition(recordDefinitionId, fieldDefinitionId).pickListId;

        $scope.pickList = pickListService.getById(pickListId);

        $scope.category = pickListService.getCategory(pickListId, categoryId);

        $scope.inputTextChanged = function()
        {
            var searchTerms = parseSearchText();
            var isWordSearch = !!searchTerms.partialWord;

            if (isWordSearch)
            {
                $scope.data.valueMatches = [];
                $scope.data.wordMatches = pickListService.wordMatches($scope.category, searchTerms);
            }
            else
            {
                $scope.data.wordMatches = [];
                $scope.data.valueMatches = pickListService.valueMatches($scope.category, searchTerms.completeWords);
            }
        };

        function cleanSpaces(text)
        {
            var cleaned = text.replace(/\s{2,}/g, " ");
            return cleaned.trim();
        }

        $scope.clearInputText = function()
        {
            $scope.data.inputText = "";
            $scope.data.wordMatches = [];
            $scope.data.valueMatches = [];
            selectSearchBox();
        };

        $scope.selectWord = function(word)
        {
            var inputText = $scope.data.inputText;
            var lastSpaceIndex = inputText.lastIndexOf(" ");
            $scope.data.inputText = inputText.substring(0, lastSpaceIndex + 1) + word + " ";
            $scope.inputTextChanged();
            selectSearchBox();
        };

        function parseAsCompleteWords(text)
        {
            var cleanedText = cleanSpaces(text);
            return cleanedText.split(" ");
        }

        function parseSearchText()
        {
            var inputText = $scope.data.inputText;

            var lastSpaceIndex = inputText.indexOf(" ");

            var isLastCharacterSpace = lastSpaceIndex == (inputText.length -1);

            if (isLastCharacterSpace)
            {
                return {
                    completeWords: cleanSpaces(inputText).split(" "),
                    partialWord: null
                }
            }

            var partialWord = cleanSpaces(inputText.substring(lastSpaceIndex + 1));
            var completeWordSection = cleanSpaces(inputText.substring(0, lastSpaceIndex));

            return {
                completeWords: completeWordSection ? completeWordSection.split(" ") : [],
                partialWord: partialWord
            };
        }

        $scope.$on("backButtonClicked", function () {

            $ionicNavBarDelegate.back();
        });

        function selectSearchBox()
        {
            $timeout(function(){document.getElementById("inputText").focus();},0);
        }

    });

})();

