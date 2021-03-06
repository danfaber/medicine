(function(){
    'use strict';

    angular.module("medicine")
        .directive("field",[function(fieldType){
            return {
                restrict: "E",
                templateUrl: "templates/directives/field.html",
                scope: {
                    recordField: "=",
                    recordDefinition: "=",
                    fieldColour: "="
                },
                controller: controller
            }
        }]);

    var controller = function($scope, $timeout, $cordovaBarcodeScanner, $state, pickListService, currentRecordService, settingsRepository)
    {
        $scope.changeToggle = function()
        {
            $scope.makeDirty();

            if ($scope.recordField.fieldDefinition.fieldType.name === "boolean") { return; }

            $scope.recordField.data.values = ($scope.recordField.data.isChecked)
                ? [{
                    value: $scope.recordField.fieldDefinition.fieldType.defaultValue(),
                    index: 0
                    }]
                : [];
        };

        $scope.addNewValue = function()
        {
            var isAlreadyEmptyValue = _($scope.recordField.data.values)
                .some(function(val){return !val.value;});

            if (isAlreadyEmptyValue) {return;}

            $scope.makeDirty();

            $scope.recordField.data.values.push(
                {
                    value: $scope.recordField.fieldDefinition.fieldType.defaultValue(),
                    index: $scope.recordField.data.values.length
                }

            );
        };

        $scope.showPlusIcon = function()
        {
            if (!$scope.recordField.fieldDefinition.isMultiSelect) { return false; }

            var isAnyEmptyValues = _($scope.recordField.data.values)
                .some(function(val) { return !val.value;});

            if (isAnyEmptyValues) {return false;}

            return !$scope.recordField.fieldDefinition.isToggled || $scope.recordField.data.isChecked
        };


        $scope.setFocus = function($event)
        {
            $timeout(function(){
                var firstItem = angular.element($event.target)[0].nextElementSibling.children[0].querySelector('input');
                var $firstItem = angular.element(firstItem)[0];
                $firstItem.focus();
            });
        };

        $scope.deleteItem = function(index){
            $scope.recordField.data.values.splice(index, 1)
        };

        $scope.makeDirty = function()
        {
            currentRecordService.get($scope.recordDefinition.id).isDirty = true;
        };

        $scope.openBarcodeReader = function()
        {
            $cordovaBarcodeScanner.scan().then(function(imageData) {
                //success
                $scope.$apply(function(){
                    $scope.recordField.data.values[0].value = imageData.text;
                    currentRecordService.get($scope.recordDefinition.id).isDirty = true;
                });
         }, function(error) {

        });
        };

        $scope.isBarcodeEnabled = function()
        {
            return settingsRepository.getBarcodeScannerEnabled();
        };

        $scope.openPickList = function(index)
        {
            var pickListId = $scope.recordField.fieldDefinition.pickListId;

            var pickList = pickListService.getById(pickListId);

            var showCategories = pickList.showCategoriesAsTabs && pickList.categories.length > 1;

            if (showCategories)
            {
                $state.go('app.pickListCategory',
                    {
                        recordDefinitionId: $scope.recordDefinition.id,
                        fieldDefinitionId: $scope.recordField.fieldDefinitionId,
                        index: index
                    });
            }
            else
            {
                $state.go('app.pickList',
                    {
                        recordDefinitionId: $scope.recordDefinition.id,
                        fieldDefinitionId: $scope.recordField.fieldDefinitionId,
                        index: index
                        /*categoryId: pickList.categories[0].id*/
                    }
                );
            }
        };


    }
})();