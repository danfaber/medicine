(function(){
    'use strict';
    angular.module("medicine").factory("currentRecordService",["recordRepository", currentRecordService]);

    function currentRecordService(recordRepository){

        var currentRecords = {};

        return {
            get: get,
            save: save,
            remove: remove
        };

        function get(recordDefinitionId)
        {
            var record = currentRecords[recordDefinitionId];
            if (!record)
            {
                record = recordRepository.getCurrentRecord(recordDefinitionId);
                currentRecords[recordDefinitionId] = record;
            }
            return record;
        }

        function save(recordDefinitionId)
        {
            var record = currentRecords[recordDefinitionId];
            recordRepository.save(record);
            remove(recordDefinitionId);
        }

        function remove(recordDefinitionId)
        {
            recordRepository.deleteCurrentRecord(recordDefinitionId);
            delete currentRecords[recordDefinitionId];
        }


    }
})();

