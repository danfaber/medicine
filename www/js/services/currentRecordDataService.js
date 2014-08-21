(function(){
    var app = angular.module("medicine");

    var currentRecordByType = {};

    app.factory("currentRecordDataService", ['typeDataService','dataType',  function(typeDataService,dataType){

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
        }

        function getId()
        {
            var nextRecordId = window.localStorage.getItem("nextRecordId");
            var id = (!nextRecordId) ? 1 : parseInt(nextRecordId);
            window.localStorage.setItem("nextRecordId",(id+1).toString());
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
        }

        function generateFieldToSave(field)
        {
            switch (field.dataType)
            {
                case dataType.freeText:
                    break;

                case dataType.date:
                    break;

                case dataType.dropdown:
                    break;

                case dataType.autoComplete:
                    break;
            }

        }

        return {
            getCurrentRecord: getCurrentRecord,
            updateAutocompleteField: updateAutocompleteField,
            save: save
        };
    }]);



})();
