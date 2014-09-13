(function(){


    //angular.module("medicine").factory("recordDefinitions", ['recordDefinitionEntity', 'fieldDefinitionEntity', 'dataType', 'pickListService', recordDefinitions]);
    angular.module("medicine").factory("recordDefinitions", ['recordDefinitionEntity', 'fieldDefinitionEntity','dataType','pickListService', recordDefinitions]);

    //  angular.module("medicine").factory("recordDefinitions", [recordDefinitions]);

    function recordDefinitions() {
        return {};
    }

/*    function recordDefinitions(recordDefinitionEntity, fieldDefinitionEntity, pickListService, dataType){

        var recordDefinitions = [

            addRecordDefinition(1, "Clinic", 1, [
                withFieldDefinition(1, "free text", 1, false, false, dataType.freeText),
                withFieldDefinition(2, "complications", 2, true, true, dataType.pickList, 1 ),
                withFieldDefinition(3, "date", 3, false, false, dataType.date)
            ]),

            addRecordDefinition(2, "Procedures", 2, [])
        ];


        function addRecordDefinition(id, name, sortOrder, fieldDefinitions)
        {
            return new recordDefinitionEntity.RecordDefinition(id, name, sortOrder, fieldDefinitions);
        }

        function withFieldDefinition(id, name, sortOrder, isToggled, isMultiSelect, dataType, pickListId, autoCompleteId)
        {
            var pickList = pickListService.getPickList(pickListId);

            return new fieldDefinitionEntity.FieldDefinition(id, name, sortOrder, isToggled, isMultiSelect, dataType, pickList)
        }

        function get(id)
        {
            var recordDefinition = _(recordDefinitions)
                .find(function(recordDef) {return recordDef.id === id;})

            if (!recordDefinition) {throw "no record definition matching!" ;}

            return recordDefinition;
        }

        return {
            all: recordDefinitions,
            get: get
        };
    }*/
})();
