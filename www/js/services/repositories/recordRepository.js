(function(){
    'use strict';
    angular.module("medicine").factory("recordRepository",['$window', 'recordDefinitions', 'recordEntity', 'recordPrefix','utilitiesService', recordRepository]);

    function recordRepository($window, recordDefinitions, recordEntity, recordPrefix, utilitiesService){

        var currentRecordPrefix = "CR_";
        var createdDatePrefix = "I_CreatedDate_";
        var followUpDatePrefix = "I_FollowUp_";
        var earliestDate = moment("2014-10-01");


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
            var createdDateText = recordDefinitions.getCreatedDate(record);
            var storageKey = createdDatePrefix+createdDateText;
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

        function getRecordsByCreatedDate(fromDateString, toDateString)
        {
            return getRecordsBetweenDates(fromDateString, toDateString, createdDatePrefix);
        }

        function getRecordsByFollowUpDate(fromDateString, toDateString)
        {
            return getRecordsBetweenDates(fromDateString, toDateString, followUpDatePrefix);
        }
        
        function getRecordsBetweenDates(fromDateString, toDateString, indexPrefix)
        {
            var fromDate = (!fromDateString || moment(fromDateString).isBefore(earliestDate))
                ? earliestDate
                : moment(fromDateString);

            var toDate = (!toDateString || moment(toDateString).isAfter(moment()))
                ? moment().get('date')
                : moment(toDateString);

            var numberOfDays = toDate.diff(fromDate, 'days');

            var loopDateString;
            var dailyKey;
            var dailyJson;
            var dailyRecordIds;
            var recordIds = [];

            for (var i = 0; i <= numberOfDays; i++)
            {
                loopDateString = fromDate.format('YYYY-MM-DD');
                dailyKey = indexPrefix + loopDateString;
                dailyJson = $window.localStorage.getItem(dailyKey);
                if (dailyJson)
                {
                    dailyRecordIds = JSON.parse(dailyJson);
                    Array.prototype.push.apply(recordIds, dailyRecordIds);
                }
                fromDate.add(1, 'days');
            }

            return recordIds;
        }






    }
})();

