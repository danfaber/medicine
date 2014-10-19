(function(){
    var app = angular.module("medicine");

    app.controller("pickListController", function($scope, $stateParams, pickListService, recordDefinitions,  $ionicNavBarDelegate) {

        var recordDefinitionId = parseInt($stateParams.recordDefinitionId);
        var fieldDefinitionId = parseInt($stateParams.fieldDefinitionId);
        var categoryId = parseInt($stateParams.categoryId);
        var index = parseInt($stateParams.index);

        $scope.data = {
            inputText: "",
            wordMatches: []
        };

        var pickListId = recordDefinitions.getFieldDefinition(recordDefinitionId, fieldDefinitionId).pickListId;

        $scope.pickList = pickListService.getById(pickListId);

        $scope.category = pickListService.getCategory(pickListId, categoryId);

        $scope.inputTextChanged = function()
        {
            var inputText = $scope.data.inputText;

            var words = inputText.split(" ");

            var currentWord = _(words).last();

            var completeWords = _(words).first(words.length - 1);

            $scope.data.wordMatches = pickListService.wordMatches($scope.category, completeWords, currentWord);
        };

        $scope.clearInputText = function()
        {
            $scope.data.inputText = "";
            $scope.data.wordMatches = [];
        };

        $scope.selectWord = function(word)
        {
            var inputText = $scope.data.inputText;
            var lastSpaceIndex = inputText.lastIndexOf(" ");
            var newInputText;

            if (lastSpaceIndex === -1)
            {
                newInputText = word;
            } else
            {
                newInputText = inputText.substring(0, lastSpaceIndex + 1) + word
            }

            $scope.data.inputText = newInputText + " ";

            $scope.data.wordMatches = [];
        };

        $scope.$on("backButtonClicked", function () {

            $ionicNavBarDelegate.back();
        });

    });

})();

