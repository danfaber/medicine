(function(){
    'use strict';

    var app = angular.module("medicine");

    app.factory("historyDataService", ['$window','typeDataService','autoCompleteTypesDataService','dataType','optionGroupDataService','utilitiesService',
        function($window, typeDataService, autoCompleteTypesDataService, dataType, optionGroupDataService, utilitiesService){

        function getNextRecordId()
        {
            var nextRecordId = $window.localStorage.getItem("nextRecordId");

            return (nextRecordId) ? parseInt(nextRecordId) : 1;
        }

        var getAllDisplayHistory = function()
        {
            var displayRecords = [];
            var currentHistoryRecord;

            var nextRecordId = getNextRecordId();

            for(var i = nextRecordId - 1; i > 0; i--)
            {
                currentHistoryRecord = getDisplayHistory(i, true);
                if (currentHistoryRecord) {
                    displayRecords.push(currentHistoryRecord);
                }
            }
            return displayRecords;
        };


        var getDisplayHistory = function(recordId, removeEmptyFields)
        {
            var historyJson = $window.localStorage.getItem(recordId.toString());

            if (!historyJson) { return; }

            var historyRecord = JSON.parse(historyJson);

            return getRecordDisplayDetails(historyRecord, removeEmptyFields);
        };

        var deleteRecord = function(recordId)
        {
            $window.localStorage.removeItem(recordId.toString());
        }


        function getRecordDisplayDetails(historyRecord, removeEmptyFields)
        {
            var displayRecord = angular.copy(historyRecord);
            var type = typeDataService.getType(historyRecord.typeId);

            displayRecord.typeName = type.name;

            if (removeEmptyFields)
            {
                utilitiesService.removeFromArray(displayRecord.fields, function(field) {return field.value == null})
            }

            _(displayRecord.fields).each(function(field) {
               addFieldDisplayProperties(field, type);
            });

            return displayRecord;
        }


        function addFieldDisplayProperties(field, type)
        {
            var fieldInfo = typeDataService.getFieldFromType(type, field.id);

            field.dataType = fieldInfo.dataType;
            field.name = fieldInfo.name;

            if (field.value == null)
            {
                field.displayText = null;
                return;
            }

            switch (field.dataType)
            {
                case dataType.freeText:
                    field.displayText = field.value;
                    break;

                case dataType.date:
                    field.displayText = field.value;
                    break;

                case dataType.dropdown:

                    var optionValueChain = optionGroupDataService.getParentChainWithNumberOfChildren(fieldInfo.optionGroupId, field.value, 0);
                    var optionValueDescriptions = _.chain(optionValueChain)
                        .rest()
                        .map(function(value) {return value.description;})
                        .value();

                    field.displayText = optionValueDescriptions.join(" - ");
                    break;

                case dataType.autoComplete:
                    field.displayText = autoCompleteTypesDataService
                        .getByKey(fieldInfo.autoCompleteTypeId, field.value[0])
                        .phrase;
                    break;

                case dataType.barcode:
                    field.displayText = field.value;
                    break;

                case dataType.toggle:
                    field.displayText = field.value ? "Yes" : "No";
                    break;
            }
        }

        return {
            getAllDisplayHistory: getAllDisplayHistory,
            getDisplayHistory: getDisplayHistory,
            deleteRecord: deleteRecord
        };
    }]);

})();