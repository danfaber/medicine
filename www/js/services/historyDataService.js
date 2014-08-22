(function(){

    var app = angular.module("medicine");

    app.factory("historyDataService", ['$window','typeDataService','autoCompleteTypesDataService','dataType',
        function($window, typeDataService, autoCompleteTypesDataService,dataType){

        function getNextRecordId()
        {
            var nextRecordId = $window.localStorage.getItem("nextRecordId");

            return (nextRecordId) ? parseInt(nextRecordId) : 1;
        };

        var getAllDisplayHistory = function()
        {
            var displayRecords = [];
            var currentHistoryJson;
            var currentHistoryRecord;

            var nextRecordId = getNextRecordId();

            for(var i = 1; i < nextRecordId; i++)
            {
                currentHistoryJson = $window.localStorage.getItem(i.toString());

                if (currentHistoryJson)
                {
                    var currentHistoryRecord = JSON.parse(currentHistoryJson);
                    displayRecords.push(getRecordDisplayDetails(currentHistoryRecord));
                }
            }
            return displayRecords;
        };


        function getRecordDisplayDetails(historyRecord)
        {
            var displayRecord = angular.copy(historyRecord);
            var type = typeDataService.getType(historyRecord.typeId);

            displayRecord.typeName = type.name;

            _(displayRecord.fields).each(function(field) {
               addFieldDisplayProperties(field, type);
            });

            return displayRecord;
        };

        function addFieldDisplayProperties(field, type)
        {
            var fieldInfo = typeDataService.getFieldFromType(type, field.id);

            field.dataType = fieldInfo.dataType;
            field.name = fieldInfo.name;

            switch (field.dataType)
            {
                case dataType.freeText:
                    field.displayText = field.value;
                    break;

                case dataType.date:
                    field.displayText = field.value;
                    break;

                case dataType.dropdown:
                    field.displayText = field.value;
                    break;

                case dataType.autoComplete:
                    field.displayText = autoCompleteTypesDataService
                        .getByKey(fieldInfo.autoCompleteTypeId, field.value)
                        .phrase;
                    break;
            }
        };

        return {
            getAllDisplayHistory:getAllDisplayHistory

        };
    }]);

})();