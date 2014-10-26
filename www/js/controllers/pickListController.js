(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("pickListController", function($scope, $stateParams, pickListService, recordDefinitions,  $ionicNavBarDelegate, $timeout, currentRecordService, $state, $ionicPopup) {

        var recordDefinitionId = parseInt($stateParams.recordDefinitionId);
        var fieldDefinitionId = parseInt($stateParams.fieldDefinitionId);
        var index = parseInt($stateParams.index);
        var categoryId = ($stateParams.categoryId) ? parseInt($stateParams.categoryId) : null;
        var pickListId = recordDefinitions.getFieldDefinition(recordDefinitionId, fieldDefinitionId).pickListId;

        $scope.pickList = pickListService.getById(pickListId);

        if (categoryId)
        {
            $scope.category = pickListService.getCategory(pickListId, categoryId);
        }

        $scope.data = {
            inputText: "",
            wordMatches: [],
            valueMatches: []
        };

        $scope.data.valueMatches = pickListService.valueMatches(pickListId, parseSearchText(),categoryId);

        $scope.inputTextChanged = function()
        {
            var searchTerms = parseSearchText();
            var isWordSearch = !!searchTerms.partialWord && $scope.pickList.isWordSearchFirst;

            if (isWordSearch)
            {
                $scope.data.valueMatches = [];
                $scope.data.wordMatches = pickListService.wordMatches(pickListId, searchTerms, categoryId);
            }
            else
            {
                $scope.data.wordMatches = [];
                $scope.data.valueMatches = pickListService.valueMatches(pickListId, searchTerms, categoryId);
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
            $scope.data.valueMatches = pickListService.valueMatches(pickListId, parseSearchText(), categoryId);
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

            var lastSpaceIndex = inputText.lastIndexOf(" ");

            var isLastCharacterSpace = lastSpaceIndex == (inputText.length -1) && inputText.length > 0;

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

        $scope.selectValue = function(value)
        {
            var currentRecord = currentRecordService.get(recordDefinitionId);

            var field = _(currentRecord.recordFields)
                .find(function(field) {return field.fieldDefinitionId === fieldDefinitionId;});

            var fieldValue = _(field.data.values)
                .find(function(val) {return val.index == index;});

            fieldValue.value = value.text;

            pickListService.incrementCount(pickListId, value);

            currentRecordService.get(recordDefinitionId).isDirty = true;

            $state.go('app.add', {recordDefinitionId: recordDefinitionId} );
        };

        $scope.$on("backButtonClicked", function () {

            $ionicNavBarDelegate.back();
        });

        $scope.addNewValue = function()
        {
            var cleanedText = cleanSpaces($scope.data.inputText);

            if ($scope.pickList.promptBeforeAdd)
            {
                var confirmAddValue = $ionicPopup.confirm({
                    title: 'Add New Value',
                    template: '<div>Are you sure you want to add:</div><div><strong>'+cleanedText+'</strong></div>'
                });

                confirmAddValue.then(function (result) {
                    if (result) {
                        addValue(cleanedText);
                    }
                    else
                    {
                        $scope.clearInputText();
                    }
                });
            }
            else
            {
                addValue(cleanedText);
            }
        };

        function addValue(cleanedText)
        {
            var newValue = pickListService.addNewValue(pickListId, cleanedText, categoryId);
            $scope.selectValue(newValue);
        }

        function selectSearchBox()
        {
            $timeout(function(){document.getElementById("inputText").focus();},0);
        }

    });

})();

