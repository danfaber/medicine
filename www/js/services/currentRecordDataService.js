(function(){
    var app = angular.module("medicine");

    var currentRecordByType = {};

    app.factory("currentRecordDataService", ['typeDataService',  function(typeDataService){

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

        return {
            getCurrentRecord: getCurrentRecord,
            updateAutocompleteField: updateAutocompleteField
        };
    }]);

})();
