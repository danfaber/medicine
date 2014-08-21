(function() {

    var app = angular.module("medicine");

    app.controller("addController", function($scope, $stateParams, currentRecordDataService, dataType) {

        $scope.data = {};

        $scope.data.currentRecord = currentRecordDataService.getCurrentRecord($stateParams.typeId);

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

        $scope.saveRecord = function()
        {
            currentRecordDataService.save($stateParams.typeId);
        }

    });


    function isParentOptionValue(optionValue)
    {
        return optionValue.optionValues && optionValue.optionValues.length > 0;
    }

})();

