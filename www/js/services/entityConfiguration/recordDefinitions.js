(function(){

    angular.module("medicine").factory("recordDefinitions",['recordDefinitionEntity', 'fieldDefinitionEntity', 'pickListService', 'allFieldTypes' , recordDefinitions]);

    function recordDefinitions(recordDefinitionEntity, fieldDefinitionEntity, pickListService, allFieldTypes){

        var recordDefinitions = [

            addRecordDefinition(1, "Clinic", 1, [
                withFieldDefinition(6, "barcode", 0, false, false, allFieldTypes.barcode),
                withFieldDefinition(1, "free text", 1, true, true, allFieldTypes.shortText),
                withFieldDefinition(2, "complications", 2, true, true, allFieldTypes.pickList, 1 ),
                withFieldDefinition(3, "date", 3, false, false, allFieldTypes.date),
                withFieldDefinition(4, "boolean",4, true, false, allFieldTypes.boolean),
                withFieldDefinition(5, "comments", 5, false, false, allFieldTypes.longText)
            ]),

            addRecordDefinition(2, "Procedures", 2, [])
        ];


        function addRecordDefinition(id, name, sortOrder, fieldDefinitions)
        {
            return new recordDefinitionEntity.RecordDefinition(id, name, sortOrder, fieldDefinitions);
        }

        function withFieldDefinition(id, name, sortOrder, isToggled, isMultiSelect, fieldType, pickListId, autoCompleteId)
        {
            var pickList = (pickListId) ? pickListService.getPickList(pickListId) : undefined;

            return new fieldDefinitionEntity.FieldDefinition(id, name, sortOrder, isToggled, isMultiSelect, fieldType, pickList)
        }

        function get(id)
        {
            var recordDefinition = _(recordDefinitions)
                .find(function(recordDef) {return recordDef.id === id;});

            if (!recordDefinition) {throw "no record definition matching!" ;}

            return recordDefinition;
        }

        return {
            all: recordDefinitions,
            get: get
        };
    }
})();
