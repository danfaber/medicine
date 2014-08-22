(function(){
    var app = angular.module("medicine");

    var currentRecordByType = {};

    app.factory("currentRecordDataService", ['typeDataService','dataType','$window',  function(typeDataService,dataType,$window){

        var getCurrentRecord = function(typeId)
        {
            if (!currentRecordByType[typeId])
            {
                currentRecordByType[typeId] = typeDataService.getTypeWithOptionGroups(typeId);
            }
            return currentRecordByType[typeId];
        }

        var updateAutocompleteField = function(typeId, fieldId, newValue)
        {
            var field = currentRecordByType[typeId].fields
                .filter(function(field) {return field.id == fieldId;})
                [0];

            field.value = newValue;
        }

        var save = function(typeId){
            var record = currentRecordByType[typeId];
            var toSave = generateRecordToSave(record);

            var jsonSave = JSON.stringify(toSave);
            $window.localStorage.setItem(toSave.id.toString(), jsonSave);

            var read = $window.localStorage.getItem(toSave.id.toString());
            alert(read);
        }

        var loadHistoryRecord = function(recordId)
        {
            var historyJson = $window.localStorage.getItem(recordId.toString());
            var historyRecord = JSON.parse(historyJson);

            var currentRecord = typeDataService.getTypeWithOptionGroups(historyRecord.typeId);

            loadDataIntoCurrentRecord(currentRecord, historyRecord);

            currentRecordByType[historyRecord.typeId] = currentRecord;
        }


        function loadDataIntoCurrentRecord(currentRecord, historyRecord)
        {
            var historyField;

            currentRecord.createdDateTime = historyRecord.createdDateTime;
            currentRecord.modifiedDateTime = historyRecord.modifiedDateTime;

            _(currentRecord.fields).each(function(currentField) {
                historyField = _(historyRecord.fields)
                    .filter(function(field) {return field.id == currentField.id;})
                [0];

                loadFieldValue(currentField, historyField);
            })
        }

        function loadFieldValue(currentField, historyField)
        {
            switch (currentField.dataType)
            {
                case dataType.freeText:
                    currentField.value = historyField.value;
                    break;

                case dataType.date:
                    currentField.value = historyField.value;

                    break;

                case dataType.dropdown:
                    break;

                case dataType.autoComplete:
                    break;
            }
        }

        function getId()
        {
            var nextRecordId = $window.localStorage.getItem("nextRecordId");
            var id = (!nextRecordId) ? 1 : parseInt(nextRecordId);
            $window.localStorage.setItem("nextRecordId",(id+1).toString());
            return id;
        }


        function generateRecordToSave(record)
        {
            var toSave = {
                id: getId(),
                typeId: record.typeId,
                createdDateTime: new Date(),
                modifiedDateTime: new Date(),
                fields: _(record.fields).map(function(field) {return generateFieldToSave(field);})
            };

            return toSave;
        }

        function generateFieldToSave(field)
        {
            var saveField = {id: field.id};

            switch (field.dataType)
            {
                case dataType.freeText:
                    saveField.value = field.value;
                    break;

                case dataType.date:
                    saveField.value = field.value;
                    break;

                case dataType.dropdown:

                    var selectedDropdowns = _(field.dropdowns)
                        .filter(function(dropdown) {return dropdown.selectedValue;});

                    saveField.value = (selectedDropdowns.length > 0)
                        ? _(field.dropdowns).last().selectedValue.id
                        : null;
                    break;

                case dataType.autoComplete:
                    saveField.value = field.value.key;
                    break;
            }

            return saveField;
        }

        return {
            getCurrentRecord: getCurrentRecord,
            updateAutocompleteField: updateAutocompleteField,
            save: save,
            loadHistoryRecord: loadHistoryRecord
        };
    }]);



})();
