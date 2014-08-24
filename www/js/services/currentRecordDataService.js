(function(){
    var app = angular.module("medicine");

    var currentRecordByType = {};

    app.factory("currentRecordDataService", ['typeDataService','dataType','$window', 'autoCompleteTypesDataService','optionGroupDataService',
        function(typeDataService, dataType, $window, autoCompleteTypesDataService, optionGroupDataService){

        var getCurrentRecord = function(typeId)
        {
            if (!currentRecordByType[typeId])
            {
                currentRecordByType[typeId] = typeDataService.getTypeWithOptionGroups(typeId);
            }
            return currentRecordByType[typeId];
        };

        var updateAutocompleteField = function(typeId, fieldId, newValue)
        {
            var field = currentRecordByType[typeId].fields
                .filter(function(field) {return field.id == fieldId;})
                [0];

            field.value = newValue;
        };

        var save = function(typeId){
            var record = currentRecordByType[typeId];
            var toSave = generateRecordToSave(record);

            var jsonSave = JSON.stringify(toSave);
            $window.localStorage.setItem(toSave.id.toString(), jsonSave);

        };

        var wipeCurrentRecord = function(typeId)
        {
            currentRecordByType[typeId] = null;
        };

        var loadHistoryRecord = function(recordId)
        {
            var historyJson = $window.localStorage.getItem(recordId.toString());
            var historyRecord = JSON.parse(historyJson);

            var currentRecord = typeDataService.getTypeWithOptionGroups(historyRecord.typeId);

            loadDataIntoCurrentRecord(currentRecord, historyRecord);

            currentRecordByType[historyRecord.typeId] = currentRecord;
        };


        var isAnyFieldSet = function(typeId)
        {
            var record = currentRecordByType[typeId];

            var dropdowns = _.chain(record.fields)
                .filter(function(field) {return field.dataType == dataType.dropdown;})
                .map(function(field) {return field.dropdowns[0];})
                .value();

            var nonDropdownFields = _(record.fields)
                .filter(function(field) {return field.dataType != dataType.dropdown;});

            return nonDropdownFields.some(function(field) {return field.value;})
                || dropdowns.some(function(dropdown) {return dropdown.value;})
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

                    if(!historyField.value) {
                        currentField.dropdowns = [optionGroupDataService.getOptionGroup(currentField.optionGroupId)];
                        break;
                    }

                    var parentChain =  optionGroupDataService.getParentChainWithNumberOfChildren(currentField.optionGroupId, historyField.value, 0);
                    var dropdowns = _(parentChain).rest();

                    var dropdown;
                    var parentId;

                    currentField.dropdowns = _(dropdowns).map(function(value) {
                        parentId = optionGroupDataService.getParentId(currentField.optionGroupId, value.id);
                        dropdown = angular.copy(optionGroupDataService.getOptionValue(currentField.optionGroupId, parentId));
                        dropdown.value = dropdown.optionValues
                            .filter(function(val) {return val.id == value.id;})
                            [0];

                        return dropdown;
                    });

                    var lowestSelectedOptionValue = optionGroupDataService.getOptionValue(currentField.optionGroupId,historyField.value);
                    if (optionGroupDataService.isParent(lowestSelectedOptionValue))
                    {
                        currentField.dropdowns.push(lowestSelectedOptionValue);
                    }

                    break;

                case dataType.autoComplete:
                    currentField.value = (historyField.value)
                        ? autoCompleteTypesDataService.getByKey(currentField.autoCompleteTypeId, historyField.value)
                        : null;
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
            return {
                id: getId(),
                typeId: record.typeId,
                createdDateTime: new Date(),
                modifiedDateTime: new Date(),
                fields: _(record.fields).map(function (field) {
                    return generateFieldToSave(field);
                })
            };
        }

        function generateFieldToSave(field)
        {
            var saveField = {id: field.id};

            switch (field.dataType)
            {
                case dataType.freeText:
                    saveField.value = (field.value) ? field.value : null;
                    break;

                case dataType.date:
                    saveField.value = (field.value) ? field.value : null;
                    break;

                case dataType.dropdown:

                    var selectedDropdowns = _(field.dropdowns)
                        .filter(function(dropdown) {return dropdown.value;});

                    saveField.value = (selectedDropdowns.length > 0)
                        ? _(selectedDropdowns).last().value.id
                        : null;
                    break;

                case dataType.autoComplete:
                    saveField.value = (field.value) ?  field.value.key : null;
                    break;
            }

            return saveField;
        }

        return {
            getCurrentRecord: getCurrentRecord,
            updateAutocompleteField: updateAutocompleteField,
            save: save,
            loadHistoryRecord: loadHistoryRecord,
            isAnyFieldSet: isAnyFieldSet,
            wipeCurrentRecord: wipeCurrentRecord
        };
    }]);



})();
