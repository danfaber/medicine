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

        function setDisplayFields(record)
        {
            record.displayFields = [];

            _(record.recordFields).each(function(field){

                var values = _(field.data.values)
                    .filter(function(value) {return !!value.value;});
/*
                var values = _.chain(field.data.values)
                    .map(function(value) {return value.value;})
                    .filter(function(value) {return !!value;})
                    .value();
                */
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

/*        function isCheckboxField(recordField)
        {
            return (recordField.fieldDefinition.isToggled || recordField.fieldDefinition.fieldType.name == "boolean");
        }*/


        return {
            Record: Record,
            setDisplayFields: setDisplayFields
        };
    }
})();
