(function(){
    'use strict';
    angular.module("medicine").factory("recordRepository",['$window', 'recordDefinitions', 'recordEntity', 'recordPrefix', recordRepository]);

    function recordRepository($window, recordDefinitions, recordEntity, recordPrefix){

        var currentRecordPrefix = "CR_";
        var datePrefix = "I_Date_";

        return {
            save:save,
            getCurrentRecord: getCurrentRecord,
            deleteCurrentRecord: deleteCurrentRecord,
            get: getRecordById,
            all: getAllRecords,
            persistCurrentRecord: persistCurrentRecord,
            getByStorageKey: getRecordByStorageKey,
            getRecordsByCreatedDate: getRecordsByCreatedDate
        };

        function save(record)
        {
            var currentDateTime = new Date();

            if (!record.id)
            {
                record.id = getRecordId(record.recordDefinitionId);
                record.createdDateTime = currentDateTime;
                indexRecordCreatedDate(record);
            } else
            {
                record.modifiedDateTime = currentDateTime;
            }

            delete record.recordDefinition;
            delete record.isDirty;

            _(record.recordFields).each(function(field){
                delete field.fieldDefinition
            });

            var recordJson = angular.toJson(record);
            var key = recordPrefix + indexKey(record.recordDefinitionId, record.id);

            $window.localStorage.setItem(key, recordJson);
        }

        function indexRecordCreatedDate(record)
        {
            var createdDate = recordDefinitions.getCreatedDate(record);
            var storageKey = datePrefix+createdDate;
            var existingRecordsJson = $window.localStorage.getItem(storageKey);

            var existingIds = existingRecordsJson ? JSON.parse(existingRecordsJson) : [];
            var recordKey = indexKey(record.recordDefinitionId, record.id);
            existingIds.push(recordKey);

            var newRecordsJson = JSON.stringify(existingIds);
            $window.localStorage.setItem(storageKey, newRecordsJson);
        }


        function indexKey(recordDefinitionId, recordId)
        {
            return recordDefinitionId + "_" + recordId;
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
            var key = indexKey(recordDefinitionId, recordId);
            return getRecordByStorageKey(key);
        }

        function getRecordByStorageKey(storageKey)
        {
            var key = recordPrefix + storageKey;
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

        function persistCurrentRecord(recordDefinitionId, record)
        {
            var key = currentRecordPrefix + recordDefinitionId;
            var recordJson = angular.toJson(record);
            $window.localStorage.setItem(key, recordJson);
        }

        function getRecordsByCreatedDate(fromDate, toDate)
        {
            var earliestDate = new Date(2014,9,1);
            var recordIds = [];
            var dailyRecordIds = [];
            var dailyJson;
            var dailyKey;

            var isValidFromDate = fromDate && fromDate >= earliestDate;
            var firstDate = isValidFromDate ? fromDate : earliestDate;

            var today = new Date().setHours(0,0,0,0);
            var isValidToDate = toDate && toDate <= today;
            var lastDate = isValidToDate ? toDate : today;

            do {
                dailyKey = datePrefix + firstDate.getTime().toString();
                dailyJson = $window.localStorage.getItem(dailyKey);
                if (dailyJson)
                {
                    dailyRecordIds = JSON.parse(dailyJson);
                    Array.prototype.push.apply(recordIds, dailyRecordIds);
                }

                firstDate.setDate(firstDate.getDate() + 1);

            } while(firstDate <= lastDate);

            return recordIds;
        }
    }
})();

