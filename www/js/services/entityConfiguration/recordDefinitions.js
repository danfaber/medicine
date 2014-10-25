(function(){
    'use strict';

    angular.module("medicine").factory("recordDefinitions",['recordDefinitionEntity', 'fieldDefinitionEntity', 'pickListService', 'allFieldTypes' , recordDefinitions]);

    function recordDefinitions(recordDefinitionEntity, fieldDefinitionEntity, pickListService, allFieldTypes){

        var recordDefinitions = [

            addRecordDefinition(1, "On-take", 1, [

                withFieldDefinition(1,"Patient Hospital Number", 1, false, false, allFieldTypes.barcode),
                withFieldDefinition(2,"Date seen", 2, false, false, allFieldTypes.date),
                withFieldDefinition(3, "Location", 3, false, false, allFieldTypes.shortText),
                withFieldDefinition(4, "Reason for referral", 4, false, false, allFieldTypes.pickList, 1),
                withFieldDefinition(5, "Presentation", 5, false, true, allFieldTypes.pickList, 2),
                withFieldDefinition(6, "Notes", 6, false, false, allFieldTypes.longText),
                withFieldDefinition(7, "Set Flag", 7, true, false, allFieldTypes.boolean)
/*                withFieldDefinition(6, "barcode", 0, false, false, allFieldTypes.barcode),
                withFieldDefinition(1, "free text", 1, true, true, allFieldTypes.shortText),
                withFieldDefinition(2, "complications", 2, true, true, allFieldTypes.pickList, 1 ),
                withFieldDefinition(7, "location", 3, false, false, allFieldTypes.pickList, 2),
                withFieldDefinition(3, "date", 3, false, false, allFieldTypes.date),
                withFieldDefinition(4, "boolean",4, true, false, allFieldTypes.boolean),
                withFieldDefinition(5, "comments", 5, false, false, allFieldTypes.longText)*/
            ])
        ];


        function addRecordDefinition(id, name, sortOrder, fieldDefinitions)
        {
            return new recordDefinitionEntity.RecordDefinition(id, name, sortOrder, fieldDefinitions);
        }

        function withFieldDefinition(id, name, sortOrder, isToggled, isMultiSelect, fieldType, pickListId, autoCompleteId)
        {
            return new fieldDefinitionEntity.FieldDefinition(id, name, sortOrder, isToggled, isMultiSelect, fieldType, pickListId)
        }

        function get(id)
        {
            var recordDefinition = _(recordDefinitions)
                .find(function(recordDef) {return recordDef.id === id;});

            if (!recordDefinition) {throw "no record definition matching!" ;}

            return recordDefinition;
        }

        function all()
        {
            return recordDefinitions;
        }

        function getFieldDefinition(recordDefinitionId, fieldDefinitionId)
        {
            var recordDefinition = get(recordDefinitionId);

            return _(recordDefinition.fieldDefinitions)
                .find(function(fieldDefinition) {return fieldDefinition.id === fieldDefinitionId;})
        }

        return {
            all: all,
            get: get,
            getFieldDefinition: getFieldDefinition
        };
    }
})();
