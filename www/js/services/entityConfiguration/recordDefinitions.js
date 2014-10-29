(function(){
    'use strict';

    angular.module("medicine").factory("recordDefinitions",['recordDefinitionEntity', 'fieldDefinitionEntity', 'allFieldTypes' , recordDefinitions]);

    function recordDefinitions(recordDefinitionEntity, fieldDefinitionEntity, allFieldTypes){

        var recordDefinitions = [

            addRecordDefinition(1, "On-take", 1, [

                withFieldDefinition(1,"Patient Hospital Number", 1, false, false, allFieldTypes.barcode),
                withFieldDefinition(2,"Date seen", 2, false, false, allFieldTypes.date),
                withFieldDefinition(3, "Location", 3, false, false, allFieldTypes.shortText),
                withFieldDefinition(4, "Reason for referral", 4, false, false, allFieldTypes.pickList, 1),
                withFieldDefinition(5, "Presentation", 5, false, true, allFieldTypes.pickList, 2),
                withFieldDefinition(6, "Diagnoses", 6, false, true, allFieldTypes.pickList, 3),
                withFieldDefinition(7, "Notes", 7, false, false, allFieldTypes.longText),
                withFieldDefinition(8, "Set Flag", 8, true, false, allFieldTypes.boolean)
            ]),

            addRecordDefinition(2, "Ward referrals", 2, [
                withFieldDefinition(1, "Patient Hospital Number", 1, false, false, allFieldTypes.barcode),
                withFieldDefinition(2, "Date referred", 2, false, false, allFieldTypes.date),
                withFieldDefinition(3, "Location", 3, false, false, allFieldTypes.shortText),
                withFieldDefinition(4, "Referral source", 4, false, false, allFieldTypes.pickList, 4),
                withFieldDefinition(5, "Reason for referral", 5, false, false, allFieldTypes.pickList, 1),
                withFieldDefinition(6, "Presentation", 6, false, true, allFieldTypes.pickList, 2),
                withFieldDefinition(7, "Diagnosis", 7, false, true, allFieldTypes.pickList, 3),
                withFieldDefinition(8, "Notes", 8, false, false, allFieldTypes.longText),
                withFieldDefinition(9, "Set Flag", 9, true, false, allFieldTypes.boolean)
            ]),

            addRecordDefinition(3, "Clinic", 3, [
                withFieldDefinition(1, "Patient Hospital Number", 1, false, false, allFieldTypes.barcode),
                withFieldDefinition(2, "Date", 2, false, false, allFieldTypes.date),
                withFieldDefinition(3, "New / Follow-up", 3, false, false, allFieldTypes.pickList, 5),
                withFieldDefinition(4, "Reason for referral", 4, false, false, allFieldTypes.pickList, 1),
                withFieldDefinition(5, "Presentation", 5, false, true, allFieldTypes.pickList, 2),
                withFieldDefinition(6, "Diagnoses", 6, false, true, allFieldTypes.pickList, 3),
                withFieldDefinition(7, "Notes", 7, false, false, allFieldTypes.longText),
                withFieldDefinition(8, "Set Flag", 8, true, false, allFieldTypes.boolean)
            ]),

            addRecordDefinition(4, "GIM Procedures", 4, [
                withFieldDefinition(1, "Patient Hospital Number", 1, false, false, allFieldTypes.barcode),
                withFieldDefinition(2, "Date", 2, false, false, allFieldTypes.date),
                withFieldDefinition(3, "Procedure", 3, false, true, allFieldTypes.pickList, 6),
                withFieldDefinition(4, "Indication", 4, false, false, allFieldTypes.pickList, 7),
                withFieldDefinition(5, "Patient Presentation", 5, false, true, allFieldTypes.pickList, 2),
                withFieldDefinition(6, "Diagnoses", 6, false, true, allFieldTypes.pickList, 3),
                withFieldDefinition(7, "Findings", 7, true, false, allFieldTypes.longText),
                withFieldDefinition(8, "Results", 8, true, false, allFieldTypes.longText),
                withFieldDefinition(9, "Complications", 9, true, false, allFieldTypes.pickList, 8),
                withFieldDefinition(10, "Notes", 10, false, false, allFieldTypes.longText),
                withFieldDefinition(11, "Set Flag", 11, true, false, allFieldTypes.boolean)
            ])
        ];

        function getCreatedDate(record)
        {
            var fieldDefinitionId;

            switch (record.recordDefinitionId)
            {
                case 1:
                    fieldDefinitionId = 2;
                    break;
                case 2:
                    fieldDefinitionId = 2;
                    break;
                case 3:
                    fieldDefinitionId = 2;
                    break;
                case 4:
                    fieldDefinitionId = 2;
                    break;
            }

            var createdField = _(record.recordFields).find(function(field) {return field.fieldDefinitionId === fieldDefinitionId;});
            var dateText = createdField.data.values[0].value;
            return Date.parse(dateText);
        }


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
            getFieldDefinition: getFieldDefinition,
            getCreatedDate: getCreatedDate
        };
    }
})();
