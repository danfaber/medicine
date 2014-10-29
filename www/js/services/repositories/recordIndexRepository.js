(function(){
    'use strict';
    angular.module("medicine").factory("recordIndexRepository",['$window', 'recordPrefix', 'earliestDate', recordIndexRepository]);

    function recordIndexRepository($window, recordPrefix, earliestDate){

        var datePrefix = "I_Date_";

        return {
            getRecordsByCreatedDate: getRecordsByCreatedDate
        };

        function getRecordsByCreatedDate(fromDate, toDate)
        {
            var recordIds = [];
            var dailyRecordIds = [];
            var dailyJson;
            var dailyKey;

            var firstDate = fromDate ? fromDate : earliestDate;
            var lastDate = toDate ? new Date().setHours(0,0,0,0);

            var loopDate;

            do {
                dailyKey = datePrefix + firstDate.getTime().toString();
                dailyJson = window.localStorage.getItem(dailyKey);
                if (dailyJson)
                {
                    dailyRecordIds = JSON.parse(dailyJson);
                    Array.prototype.push.apply(recordIds, dailyRecordIds);
                }

                firstDate.setDate(firstDate.getDate() + 1);

            } while(firstDate <= lastDate)

            return recordIds;
        }
    }
})();

