(function(){
    'use strict';

    angular.module("medicine").factory("recordDefinitions",['recordDefinitionEntity', 'fieldDefinitionEntity', 'allFieldTypes' , recordDefinitions]);

    function recordDefinitions(recordDefinitionEntity, fieldDefinitionEntity, allFieldTypes){

        var recordDefinitions = [

            addRecordDefinition(1, "On-take", 1, "#00A0B0", [

                withFieldDefinition(1,"Patient Hospital Number", 1, false, false, allFieldTypes.barcode),
                withFieldDefinition(2,"Date seen", 2, false, false, allFieldTypes.date),
                withFieldDefinition(3, "Location", 3, false, false, allFieldTypes.pickList, 9),
                withFieldDefinition(4, "Reason for referral", 4, false, false, allFieldTypes.pickList, 1),
                withFieldDefinition(5, "Symptoms", 5, false, true, allFieldTypes.pickList, 2),
                withFieldDefinition(6, "Diagnoses", 6, false, true, allFieldTypes.pickList, 3),
                withFieldDefinition(7, "Notes", 7, false, false, allFieldTypes.longText),
                withFieldDefinition(8, "Follow up", 8, true, false, allFieldTypes.date),
                withFieldDefinition(9, "Age", 9, false, false, allFieldTypes.number),
                withFieldDefinition(10, "Gender", 10, false, false, allFieldTypes.pickList, 10)
            ]),

            addRecordDefinition(2, "Ward referrals", 2, "#6A4A3C", [
                withFieldDefinition(1, "Patient Hospital Number", 1, false, false, allFieldTypes.barcode),
                withFieldDefinition(2, "Date referred", 2, false, false, allFieldTypes.date),
                withFieldDefinition(3, "Location", 3, false, false, allFieldTypes.pickList, 9),
                withFieldDefinition(4, "Referral source", 4, false, false, allFieldTypes.pickList, 4),
                withFieldDefinition(5, "Reason for referral", 5, false, false, allFieldTypes.pickList, 1),
                withFieldDefinition(6, "Symptoms", 6, false, true, allFieldTypes.pickList, 2),
                withFieldDefinition(7, "Diagnosis", 7, false, true, allFieldTypes.pickList, 3),
                withFieldDefinition(8, "Notes", 8, false, false, allFieldTypes.longText),
                withFieldDefinition(9, "Follow up", 9, true, false, allFieldTypes.date),
                withFieldDefinition(10, "Age", 10, false, false, allFieldTypes.number),
                withFieldDefinition(11, "Gender", 11, false, false, allFieldTypes.pickList, 10)
            ]),

            addRecordDefinition(3, "Clinic", 3, "#CC333F", [
                withFieldDefinition(1, "Patient Hospital Number", 1, false, false, allFieldTypes.barcode),
                withFieldDefinition(2, "Date", 2, false, false, allFieldTypes.date),
                withFieldDefinition(3, "New / Follow-up", 3, false, false, allFieldTypes.pickList, 5),
                withFieldDefinition(4, "Reason for referral", 4, false, false, allFieldTypes.pickList, 1),
                withFieldDefinition(5, "Symptoms", 5, false, true, allFieldTypes.pickList, 2),
                withFieldDefinition(6, "Diagnoses", 6, false, true, allFieldTypes.pickList, 3),
                withFieldDefinition(7, "Notes", 7, false, false, allFieldTypes.longText),
                withFieldDefinition(8, "Follow up", 8, true, false, allFieldTypes.date),
                withFieldDefinition(9, "Age", 9, false, false, allFieldTypes.number),
                withFieldDefinition(10, "Gender", 10, false, false, allFieldTypes.pickList, 10)
            ]),

            addRecordDefinition(4, "Procedures", 4, "#EB6841", [
                withFieldDefinition(1, "Patient Hospital Number", 1, false, false, allFieldTypes.barcode),
                withFieldDefinition(2, "Date", 2, false, false, allFieldTypes.date),
                withFieldDefinition(3, "Procedure", 3, false, true, allFieldTypes.pickList, 6),
                withFieldDefinition(4, "Indication", 4, false, false, allFieldTypes.pickList, 7),
                withFieldDefinition(5, "Symptoms", 5, false, true, allFieldTypes.pickList, 2),
                withFieldDefinition(6, "Diagnoses", 6, false, true, allFieldTypes.pickList, 3),
                withFieldDefinition(7, "Findings", 7, true, false, allFieldTypes.longText),
                withFieldDefinition(8, "Results", 8, true, false, allFieldTypes.longText),
                withFieldDefinition(9, "Complications", 9, true, false, allFieldTypes.pickList, 8),
                withFieldDefinition(10, "Notes", 10, false, false, allFieldTypes.longText),
                withFieldDefinition(11, "Follow up", 11, true, false, allFieldTypes.date),
                withFieldDefinition(12, "Age", 12, false, false, allFieldTypes.number),
                withFieldDefinition(13, "Gender", 13, false, false, allFieldTypes.pickList, 10)
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
            return createdField.data.values[0];
        }

        function getFollowUpDate(record)
        {
            var fieldDefinitionId;

            switch (record.recordDefinitionId)
            {
                case 1:
                    fieldDefinitionId = 8;
                    break;
                case 2:
                    fieldDefinitionId = 9;
                    break;
                case 3:
                    fieldDefinitionId = 8;
                    break;
                case 4:
                    fieldDefinitionId = 11;
                    break;
            }

            var followUpField = _(record.recordFields).find(function(field) {return field.fieldDefinitionId === fieldDefinitionId;});
            return followUpField.data;
        }


        function addRecordDefinition(id, name, sortOrder, colour, fieldDefinitions)
        {
            return new recordDefinitionEntity.RecordDefinition(id, name, sortOrder, colour, fieldDefinitions);
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
            getCreatedDate: getCreatedDate,
            getFollowUpDate: getFollowUpDate
        };
    }
})();
