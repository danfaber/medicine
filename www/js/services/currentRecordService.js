(function(){
    'use strict'
    angular.module("medicine").factory("currentRecordService",["recordRepository", currentRecordService]);

    function currentRecordService(recordRepository){

        var currentRecords = {};

        return {
        };


        function get(recordDefinitionId)
        {
            var record = currentRecords[recordDefinitionId];

            if (record) {return record;}




        }

    }
})();

