(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("pickListController", function($scope, $stateParams, pickListService, recordDefinitions,  $ionicNavBarDelegate, $timeout, currentRecordService, $state, $ionicPopup, maximumPickListMatchesToDisplay, utilitiesService, pickListRepository, $ionicPopover) {

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
            valueMatches: [],
            maximumPickListMatchesToDisplay: maximumPickListMatchesToDisplay,
            showAddSearchBar: $scope.pickList.isAbleToAddNewValues || $scope.pickList.values.length > 7
        };
        
        $scope.data.topStyle = {top: $scope.data.showAddSearchBar ? '53px' : '13px'};

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

        $scope.inputKeyPress = function($event)
        {
            if ($event.keyCode == 13 && $scope.isLongEnoughToAddNewValue() && $scope.pickList.isAbleToAddNewValues)
            {
                $scope.addNewValue();
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

        $scope.isLongEnoughToAddNewValue = function()
        {
            return $scope.data.inputText.length > 2
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
/*            var currentRecord = currentRecordService.get(recordDefinitionId);

            var field = _(currentRecord.recordFields)
                .find(function(field) {return field.fieldDefinitionId === fieldDefinitionId;});

            var isSameValueAlreadySelectedForDifferentIndex = _.chain(field.data.values)
                .filter(function(val){return val.index != index;})
                .some(function(val){return val.value.text == value.text && val.value.categoryId == value.categoryId;})
                .value();

            var fieldValue = _(field.data.values)
                .find(function(val) {return val.index == index;});

            var newTextValue = isSameValueAlreadySelectedForDifferentIndex ? null : value.text;

            fieldValue.value = {text: newTextValue, categoryId: value.categoryId};

            pickListService.incrementCount(pickListId, value);

            currentRecordService.get(recordDefinitionId).isDirty = true;

            pickListRepository.setRecentPickListValue(pickListId, value);*/

            pickListService.selectValue(recordDefinitionId, fieldDefinitionId, pickListId, index, value);

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

        $scope.longPressValue = function(value)
        {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Value',
                template: 'Are you sure you want to permanently delete:</br><strong>'+ value.text + '</strong>?'
            });
            confirmPopup.then(function(result) {
                if(result) {
                    utilitiesService.removeFromArray($scope.data.valueMatches, function(val) {
                        return val.text === value.text && val.categoryId === value.categoryId;
                    });
                    pickListService.deleteValue(pickListId, value);
                }
            });
        };

        $scope.setAsNullValue = function()
        {
            pickListService.setAsNullValue(recordDefinitionId, fieldDefinitionId, index);
            $state.go('app.add', {recordDefinitionId: recordDefinitionId} );
        };

        function addValue(cleanedText)
        {
            var isMultiplePossibleCategories = categoryId === null && $scope.pickList.categories.length > 1;

            if (isMultiplePossibleCategories)
            {
                $state.go('app.newPickListValueCategory', {pickListId: pickListId, text: cleanedText, fieldDefinitionId: fieldDefinitionId, index: index, recordDefinitionId: recordDefinitionId} );
            }
            else
            {
                var newValueCategoryId = categoryId !== null ? categoryId
                    : $scope.pickList.categories[0].id;

                var newValue = pickListService.addNewValue(pickListId, cleanedText, newValueCategoryId);
                $scope.selectValue(newValue);
            }

        }

        function selectSearchBox()
        {
            $timeout(function(){document.getElementById("inputText").focus();},0);
        }




    });

})();

