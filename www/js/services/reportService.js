(function(){
    'use strict';

    angular.module("medicine").factory("reportService",['recordSearchService', 'settingsRepository', '$filter', 'pickListService', reportService]);

    function reportService(recordSearchService, settingsRepository, $filter, pickListService){

        var records;
        var procedurePickListId = 6;

        return {
            generateReport:generateReport

        };


        function generateReport(searchDefinition)
        {
            records = recordSearchService.getRecords(searchDefinition);
            var vm = {};

            vm.userName = settingsRepository.getUserName();
            vm.totalEncounters = records.length;
            vm.fromDate = $filter('date')(searchDefinition.fromDate,'longDate');
            vm.toDate = $filter('date')(searchDefinition.toDate,'longDate');

            vm.numberOfClinicalEncounters = countByRecordDefinitionId(3);
            vm.numberOfClinicalFollowUps = numberOfFollowUpClinics();
            vm.numberOfWardReferrals = countByRecordDefinitionId(2);
            vm.numberOfTake = countByRecordDefinitionId(1);
            vm.numberOfProcedures = countByRecordDefinitionId(4);

            vm.proceduresByCategory = getProcedures();

            vm.presentations = getPresentations();

            vm.diagnoses = getDiagnoses();

            return vm;
        }

        function countByRecordDefinitionId(recordDefinitionId)
        {
            return _(records)
                .filter(function(record){return record.recordDefinitionId === recordDefinitionId;})
                .length;
        }

        function numberOfFollowUpClinics()
        {
            return _.chain(records)
                .filter(function(record){return record.recordDefinitionId === 3;})
                .filter(function(record){return isFollowUp(record);})
                .value()
                .length;
        }

        function isFollowUp(record)
        {
            return _(record.recordFields)
                .some(function(field){
                    return field.fieldDefinition.pickListId === 5 &&
                    _(field.data.values).some(function(val) {return val.value.text === "Follow-up";})}
            );
        }

        function getProcedures()
        {
            var proceduresByCategory = _.chain(records)
                .map(function(record){return _(record.recordFields).find(function(field){return field.fieldDefinition.pickListId === 6;})})
                .filter(function(field){return field;})
                .map(function(field) {return _.chain(field.data.values).filter(function(val){return val.value;}).map(function(value){return value.value;}).value()})
                .flatten(true)
                .groupBy(function(val) {return val.categoryId;})
                .value();

            return _(proceduresByCategory)
                .map(function(items,categoryId){return {
                        category: pickListService.getCategory(procedurePickListId, parseInt(categoryId)).name,
                        procedures: _(items).countBy(function(proc){return proc.text;})}
                });
        }

        function getPresentations()
        {
            var presentations = _.chain(records)
                .map(function(record) {return _(record.recordFields).find(function(field) {return field.fieldDefinition.pickListId === 2; })})
                .filter(function(field){return field;})
                .map(function(field){return _.chain(field.data.values).filter(function(val){return val.value;}).map(function(value){return value.value.text;}).value()})
                .flatten(true)
                .value();

            return _(presentations).countBy(function(presentation){return presentation;});
        }


        function getDiagnoses()
        {
            var diagnosisPickListId = 3;

            var diag = _.chain(records)
                .map(function(record){return _(record.recordFields).find(function(field){return field.fieldDefinition.pickListId === diagnosisPickListId; })})
                .filter(function(field){return field;})
                .map(function(field){return field.data.values})
                .flatten(true)
                .filter(function(val){return val.value;})
                .map(function(val) {return val.value;})
                .groupBy(function(val){return val.categoryId; })
                .map(function(values, categoryId){return {
                    category: pickListService.getCategory(diagnosisPickListId, parseInt(categoryId)).name,
                    total: values.length,
                    detail: _(values).countBy(function(val){return val.text;})
                } })
                .value();

/*            var x = _.chain(records)
            .map(function(record){return _(record.recordFields).find(function(field){return field.fieldDefinition.pickListId === 3; })})
            .value();*/


            return diag;

        }

        

    }

})();


