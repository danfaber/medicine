(function(){

    angular.module("medicine").factory("recordDefinitions", ['recordDefinitionEntity', 'fieldDefinitionEntity', 'pickListService', 'freeTextType', 'date_Type', 'booleanType', recordDefinitions]);

    function recordDefinitions(recordDefinitionEntity, fieldDefinitionEntity, pickListService, freeTextType, date_Type, booleanType){

        var recordDefinitions = [

            addRecordDefinition(1, "Clinic", 1, [
                withFieldDefinition(1, "free text", 1, true, false, freeTextType),
                withFieldDefinition(2, "complications", 2, true, true, freeTextType, 1 ),
                withFieldDefinition(3, "date", 3, false, false, date_Type),
                withFieldDefinition(4, "boolean",4, false, false, booleanType)
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
                .find(function(recordDef) {return recordDef.id === id;})

            if (!recordDefinition) {throw "no record definition matching!" ;}

            return recordDefinition;
        }

        return {
            all: recordDefinitions,
            get: get
        };
    }
})();
