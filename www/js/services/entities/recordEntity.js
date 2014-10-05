(function(){

    angular.module("medicine").factory("recordEntity", ["recordFieldEntity", recordEntity]);

    function recordEntity(recordFieldEntity){

        function Record(recordDefinition)
        {
            this.recordDefinition = recordDefinition;
            this.recordDefinitionId = recordDefinition.id;
            this.recordFields = recordDefinition.fieldDefinitions
                .map(function(fieldDefinition) {return new recordFieldEntity.RecordField(fieldDefinition);})
        }

        return {
            Record: Record
        };
    }
})();
