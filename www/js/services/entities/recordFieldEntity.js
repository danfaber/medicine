(function(){

    angular.module("medicine").factory("recordFieldEntity", ["dataType" ,recordFieldEntity]);

    function recordFieldEntity(dataType){

        function RecordField(fieldDefinition)
        {
            this.fieldDefinition = fieldDefinition;
            this.fieldDefinitionId = fieldDefinition.id;

            var isCheckboxType = (fieldDefinition.isToggled || fieldDefinition.fieldType.name == "boolean");

            this.data = (isCheckboxType)
                ? {isChecked: false, values:[]}
                : {values:[fieldDefinition.fieldType.defaultValue]};
        }

        return {
            RecordField: RecordField
        };
    }
})();

