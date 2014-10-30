(function(){
    'use strict';

    angular.module("medicine").factory("recordSearchService",['recordRepository', recordSearchService]);

    function recordSearchService(recordRepository)
    {
        return {
            SearchDefinition: SearchDefinition,
            getRecords: getRecords
        };

        function SearchDefinition(fromDate, toDate, followUpOnly, filterWords)
        {
            this.fromDate = fromDate;
            this.toDate = toDate;
            this.followUpOnly = followUpOnly;
            this.filterWords = filterWords;
        }

        function getRecords(searchDefinition)
        {
            /* add more filtering logic here in due course*/

/*            var fromDate = new Date(searchDefinition.fromDate);
            var toDate = new Date(searchDefinition.toDate);*/

            var dateMatchRecordIds = recordRepository.getRecordsByCreatedDate(searchDefinition.fromDate, searchDefinition.toDate);

            return _(dateMatchRecordIds).map(function(id) {return recordRepository.getByStorageKey(id);})
        }
    }

})();

