(function() {

    var app = angular.module("medicine");

    app.controller("addController", function($scope, $stateParams, typeDataService, $ionicModal, icd10DataService, $timeout, $ionicScrollDelegate, currentRecordDataService, dataType) {

        $scope.data = {};

        $scope.data.currentRecord = currentRecordDataService.getCurrentRecord($stateParams.typeId);

        var optionGroupFields = $scope.data.currentRecord.fields
            .filter(function(field) {return field.dataType == dataType.dropdown;})

        _(optionGroupFields).each(function(field) {
            field.dropdowns = recursiveOptionDropdowns(field.optionGroup);
        });

        $scope.selectedOptionValue = function(field, dropdown)
        {
            var index = field.dropdowns.indexOf(dropdown);

            // remove all lower down dropddowns coz they are no longer correct
            field.dropdowns.splice(index + 1, Number.MAX_VALUE);

            if (dropdown.selectedValue && isParentOptionValue(dropdown.selectedValue))
            {
                field.dropdowns.push(dropdown.selectedValue);
            }
        }

    });

    function recursiveOptionDropdowns(optionGroup)
    {
        if (!optionGroup.selectedValue || !isParentOptionValue(optionGroup)) {
            return [optionGroup];
        }
        return recursiveOptionDropdowns(optionGroup.selectedValue).push(optionGroup);
    };

    function isParentOptionValue(optionValue)
    {
        return optionValue.optionValues && optionValue.optionValues.length > 0;
    }

})();

