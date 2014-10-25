(function(){
    'use strict';

    angular.module("medicine").factory("recordEntity", ["recordFieldEntity", recordEntity]);

    function recordEntity(recordFieldEntity){

        function Record(recordDefinition)
        {
            this.recordDefinition = recordDefinition;
            this.recordDefinitionId = recordDefinition.id;
            this.recordFields = recordDefinition.fieldDefinitions
                .map(function(fieldDefinition) {return new recordFieldEntity.RecordField(fieldDefinition);});

            this.createdDateTime = null;
            this.modifiedDateTime = null;
        }

        function setDisplayFields(record)
        {
            record.displayFields = [];

            _(record.recordFields).each(function(field){

                var values = _(field.data.values)
                    .filter(function(value) {return !!value.value;});

                var isCheckboxField = field.fieldDefinition.isToggled || field.fieldDefinition.fieldType.name === "boolean";


                var displayValues = [];

                if (isCheckboxField)
                {
                    displayValues.push(
                        {
                            index: -1,
                            value: field.data.isChecked ? "Yes" : "No"
                        }
                    );
                }
                _(values).each(function(value) {
                   displayValues.push(value);
                });

                if (displayValues.length == 0) {return;}

                record.displayFields.push(
                    {
                        name: field.fieldDefinition.name,
                        values: displayValues
                    }
                );
            });
        }

/*        function isEqualToDefaultRecord(record)
        {
            var isAllFieldsEqualToDefault = _(record.recordFields)
                .every(function(field) {return isFieldEqualDefault(field);})

            return isAllFieldsEqualToDefault;
        }*/

/*        function isFieldEqualDefault(field)
        {
            var defaultField = new recordFieldEntity.RecordField(field.fieldDefinition);

            var hasCheckbox = _.has(defaultField, "isChecked");

            var defaultData = defaultField.data;
            var fieldData = field.data;

            if (hasCheckbox && defaultData.isChecked != fieldData.isChecked) { return false; }

            var hasSameNumberOfValues = defaultData.values.length === fieldData.values.length;
            if (!hasSameNumberOfValues) { return false; }

            for (var i = 0; i < defaultData.values.length; i++)
            {
                if (defaultData.values[i].value !== fieldData.values[i].value)
                {
                    return false;
                }
            }
            return true;
        }*/

        return {
            Record: Record,
            setDisplayFields: setDisplayFields
          /*  isEqualToDefaultRecord: isEqualToDefaultRecord*/
        };
    }
})();
