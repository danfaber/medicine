(function(){
    'use strict';

    angular.module("medicine").factory("recordSearchService",['recordRepository', recordSearchService]);

    function recordSearchService(recordRepository)
    {
        return {
            SearchDefinition: SearchDefinition,
            getRecords: getRecords
        };

        function SearchDefinition(fromDate, toDate, filterWords, followUpByDate)
        {
            this.fromDate = fromDate;
            this.toDate = toDate;
            this.filterWords = filterWords;
            this.followUpByDate = followUpByDate;
        }

        function getRecords(searchDefinition)
        {
            /* add more filtering logic here in due course*/

            var dateMatchRecordIds;
            var followUpByRecordIds;

            if (searchDefinition.fromDate && searchDefinition.toDate)
            {
                dateMatchRecordIds = recordRepository.getRecordsByCreatedDate(searchDefinition.fromDate, searchDefinition.toDate);
            }

            if (searchDefinition.followUpByDate)
            {
                followUpByRecordIds = recordRepository.getRecordsByFollowUpDate(searchDefinition.followUpByDate);
            }
            /*
            * todo now need to check which these are to get the records
            * will also need to introduce paging
            * will also need to add word search on here with word indexing (but do after follow up stuff)
            *
            * */


            return _(dateMatchRecordIds).map(function(id) {return recordRepository.getByStorageKey(id);})
        }
    }

})();

