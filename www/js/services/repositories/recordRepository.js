(function(){
    'use strict'
    angular.module("medicine").factory("recordRepository",['$window', 'recordDefinitions', recordRepository]);

    function recordRepository($window, recordDefinitions){

        var recordPrefix = "R_";
        var currentRecordPrefix = "CR_";

        return {
            save:save
        };

        function save(record)
        {
            if (!record.id)
            {
                record.id = getRecordId(record.recordDefinitionId);
            }

            delete record.recordDefinition;

            _(record.recordFields).each(function(field){
                delete field.fieldDefinition
            });

            var recordJson = JSON.stringify(record);

            $window.localStorage.setItem(recordPrefix+record.recordDefinitionId+record.id, recordJson);
        }

        function getRecordId(recordDefinitionId)
        {
            var nextKey = recordPrefix+ recordDefinitionId + "_nextId";
            var nextRecordId = $window.localStorage.getItem(nextKey);
            var id = (!nextRecordId) ? 1 : parseInt(nextRecordId);
            $window.localStorage.setItem(nextKey, (id+1).toString());
            return id;
        }

        function getCurrentRecord(recordDefinitionId)
        {
            var currentRecordJson = $window.localStorage.getItem(currentRecordPrefix+recordDefinitionId);

        }


        function rehydrateRecordFromJson(recordJson)
        {
            var record = JSON.parse(recordJson);
            record.recordDefinition = recordDefinitions.get(record.recordDefinitionId);

            _(record.recordFields).each(function(field) {
                field.fieldDefinition = _(record.recordDefinition.fieldDefinitions)
                    .find(function(fieldDef) {return fieldDef.id == field.fieldDefinitionId;})
            });

            return record;
        }
    }
})();

