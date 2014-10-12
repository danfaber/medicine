(function(){
    'use strict';
    angular.module("medicine").factory("recordRepository",['$window', 'recordDefinitions', 'recordEntity', recordRepository]);

    function recordRepository($window, recordDefinitions, recordEntity){

        var recordPrefix = "R_";
        var currentRecordPrefix = "CR_";

        return {
            save:save,
            getCurrentRecord: getCurrentRecord,
            deleteCurrentRecord: deleteCurrentRecord,
            get: getRecordById,
            all: getAllRecords
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

            var recordJson = angular.toJson(record);
            var key = getRecordKey(record.recordDefinitionId, record.id);

            $window.localStorage.setItem(key, recordJson);
        }

        function getRecordKey(recordDefinitionId, recordId)
        {
            return recordPrefix + recordDefinitionId + "_" + recordId;
        }

        function getRecordId(recordDefinitionId)
        {
            var id = nextRecordId(recordDefinitionId);
            var key = nextKey(recordDefinitionId);
            $window.localStorage.setItem(key, (id+1).toString());
            return id;
        }

        function nextRecordId (recordDefinitionId)
        {
            var key = nextKey(recordDefinitionId);
            var nextRecordId = $window.localStorage.getItem(key);
            return (!nextRecordId) ? 1 : parseInt(nextRecordId);
        }

        function nextKey(recordDefinitionId)
        {
            return recordPrefix+ recordDefinitionId + "_nextId";
        }

        function getCurrentRecord(recordDefinitionId)
        {
            var currentRecordJson = $window.localStorage.getItem(currentRecordPrefix+recordDefinitionId);

            if (currentRecordJson) { return rehydrateRecordFromJson(currentRecordJson); }

            var recordDefinition = recordDefinitions.get(recordDefinitionId);
            return new recordEntity.Record(recordDefinition);
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


        function deleteCurrentRecord(recordDefinitionId)
        {
            $window.localStorage.removeItem(currentRecordPrefix + recordDefinitionId);
        }

        function getRecordById(recordDefinitionId, recordId)
        {
            var key = getRecordKey(recordDefinitionId,recordId);
            var recordJson = $window.localStorage.getItem(key);
            if (!recordJson) {return;}

            return rehydrateRecordFromJson(recordJson);
        }

        function getAllRecords(recordDefinitionId)
        {
            var nextId = nextRecordId(recordDefinitionId);
            var records = [];
            var record;

            for (var i = nextId - 1; i > 0; i--)
            {
                record = getRecordById(recordDefinitionId, i);
                if (record) { records.push(record); }
            }

            return records;
        }
    }
})();

